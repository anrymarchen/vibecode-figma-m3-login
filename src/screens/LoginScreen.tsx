import { useState, type FormEvent } from 'react';

import GoogleLogo from '../assets/icons/g-logo-color.svg?react';

import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Grid } from '../layout/grid';
import { StackedCard } from '../components/StackedCard/StackedCard';
import { TextField } from '../components/TextField/TextField';

type LoginScreenProps = {
  error: string;
  setError: (value: string) => void;
  submitLogin: (
    event: FormEvent,
    login: string,
    password: string,
  ) => void;
  goToRegister: () => void;
};

export function LoginScreen({
  error,
  setError,
  submitLogin,
  goToRegister,
}: LoginScreenProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    submitLogin(event, login, password);
  };

  return (
    <main className="login-page">
      <Grid className="login-grid">
        <StackedCard
          className="login-card"
          layout="Slot"
          content={
            <div className="login-content">
              <header className="login-content__header">
                Welcome back!
              </header>

              <div className="login-content__body">
                <p className="login-content__subtitle">
                  Sign in to your account
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="login-content__fields">
                    <TextField
                      id="login"
                      labelText="Login"
                      placeholderText="Login"
                      supportingText="Wrong login"
                      showSupportingText={Boolean(error)}
                      style="Filled"
                      state={
                        error ? 'Error' : 'Enabled'
                      }
                      trailingAction="clear"
                      showTrailingIcon
                      value={login}
                      onChange={(event) => {
                        setError('');
                        setLogin(event.target.value);
                      }}
                      onValueChange={(value) => {
                        setError('');
                        setLogin(value);
                      }}
                    />

                    <TextField
                      id="password"
                      labelText="Password"
                      placeholderText="Password"
                      supportingText="Wrong password"
                      showSupportingText={Boolean(error)}
                      style="Filled"
                      state={
                        error ? 'Error' : 'Enabled'
                      }
                      type="password"
                      trailingAction="password-toggle"
                      showTrailingIcon
                      value={password}
                      onChange={(event) => {
                        setError('');
                        setPassword(
                          event.target.value,
                        );
                      }}
                      onValueChange={(value) => {
                        setError('');
                        setPassword(value);
                      }}
                    />
                  </div>

                  <div className="login-content__mid">
                    <Button
                      label="Forgot password?"
                      showIcon={false}
                      size="xsmall"
                      variant="text"
                      type="button"
                    />

                    <Checkbox
                      label="Remember me"
                      defaultChecked
                    />
                  </div>

                  <div className="login-content__actions">
                    <div
                      className="login-content__error"
                      role="alert"
                    >
                      {error}
                    </div>

                    <div className="login-content__action-list">
                      <Button
                        label="Sign in"
                        showIcon={false}
                        type="submit"
                        className="login-content__full-button"
                      />

                      <Button
                        label="Sign in with Google"
                        showIcon
                        type="button"
                        icon={
                          <GoogleLogo
                            className="google-logo"
                            aria-hidden="true"
                          />
                        }
                        variant="outline"
                        className="login-content__full-button login-content__google-button"
                      />

                      <div className="login-content__separator">
                        <span />
                        <span>or</span>
                        <span />
                      </div>

                      <Button
                        label="Create account"
                        showIcon={false}
                        variant="outline"
                        type="button"
                        className="login-content__full-button"
                        onClick={goToRegister}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          }
        />
      </Grid>
    </main>
  );
}