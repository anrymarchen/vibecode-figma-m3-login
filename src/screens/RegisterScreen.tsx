import { useState, type FormEvent } from 'react';

import GoogleLogo from '../assets/icons/g-logo-color.svg?react';

import { Button } from '../components/Button/Button';
import { Grid } from '../layout/grid';
import { StackedCard } from '../components/StackedCard/StackedCard';
import { TextField } from '../components/TextField/TextField';

type RegisterScreenProps = {
  error: string;
  setError: (value: string) => void;
  submitRegistration: (
    event: FormEvent,
    login: string,
    password: string,
    repeatPassword: string,
  ) => void;
  goToLogin: () => void;
};

export function RegisterScreen({
  error,
  setError,
  submitRegistration,
  goToLogin,
}: RegisterScreenProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (event: FormEvent) => {
    submitRegistration(
      event,
      login,
      password,
      repeatPassword,
    );
  };

  return (
    <main className="login-page">
      <Grid className="login-grid">
        <StackedCard
          className="login-card"
          layout="Slot"
          content={
            <div className="login-content">
              <header className="login-content__header login-content__header--back">
                <Button
                  label="Back"
                  showIcon={false}
                  size="xsmall"
                  variant="text"
                  type="button"
                  onClick={goToLogin}
                />

                <span>Create account</span>
              </header>

              <div className="login-content__body">
                <p className="login-content__subtitle">
                  Sign up for a new account
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="login-content__fields">
                    <TextField
                      id="register-login"
                      labelText="Login"
                      placeholderText="Login"
                      supportingText="Invalid login"
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
                      id="register-password"
                      labelText="Password"
                      placeholderText="Password"
                      supportingText="Invalid password"
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
                        setPassword(event.target.value);
                      }}
                      onValueChange={(value) => {
                        setError('');
                        setPassword(value);
                      }}
                    />

                    <TextField
                      id="repeat-password"
                      labelText="Repeat password"
                      placeholderText="Repeat password"
                      supportingText="Passwords do not match"
                      showSupportingText={Boolean(error)}
                      style="Filled"
                      state={
                        error ? 'Error' : 'Enabled'
                      }
                      type="password"
                      trailingAction="password-toggle"
                      showTrailingIcon
                      value={repeatPassword}
                      onChange={(event) => {
                        setError('');
                        setRepeatPassword(
                          event.target.value,
                        );
                      }}
                      onValueChange={(value) => {
                        setError('');
                        setRepeatPassword(value);
                      }}
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
                        label="Create new account"
                        showIcon={false}
                        type="submit"
                        className="login-content__full-button"
                      />

                      <Button
                        label="Continue with Google"
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
                        onClick={() => undefined}
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