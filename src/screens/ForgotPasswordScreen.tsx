import { useState, type FormEvent } from 'react';

import { Button } from '../components/Button/Button';
import { Grid } from '../layout/grid';
import { StackedCard } from '../components/StackedCard/StackedCard';
import { TextField } from '../components/TextField/TextField';

type ForgotPasswordScreenProps = {
  message: string;
  error: string;
  submitForgotPassword: (
    event: FormEvent,
    login: string,
  ) => void;
  goToLogin: () => void;
};

export function ForgotPasswordScreen({
  message,
  error,
  submitForgotPassword,
  goToLogin,
}: ForgotPasswordScreenProps) {
  const [login, setLogin] = useState('');

  const handleSubmit = (event: FormEvent) => {
    submitForgotPassword(event, login);
  };

  const hasError = Boolean(error);

  return (
    <main className="login-page">
      <Grid className="login-grid">
        <StackedCard
          className="login-card"
          layout="Slot"
          content={
            <div className="login-content">
              <header className="login-content__header">
                Forgot password?
              </header>

              <div className="login-content__body">
                <p className="login-content__subtitle">
                  Enter your login to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="login-content__fields">
                    <TextField
                      id="forgot-password-login"
                      labelText="Login"
                      placeholderText="Login"
                      style="Filled"
                      state={hasError ? 'Error' : 'Enabled'}
                      supportingText={error}
                      showSupportingText={hasError}
                      trailingAction="clear"
                      showTrailingIcon
                      value={login}
                      onChange={(event) => setLogin(event.target.value)}
                      onValueChange={setLogin}
                    />
                  </div>

                  <div className="login-content__actions">
                    {message && (
                      <div
                        className="login-content__error"
                        role="status"
                      >
                        {message}
                      </div>
                    )}

                    <div className="login-content__action-list">
                      <Button
                        label="Send reset link"
                        showIcon={false}
                        type="submit"
                        className="login-content__full-button"
                      />

                      <Button
                        label="Back to sign in"
                        showIcon={false}
                        variant="outline"
                        type="button"
                        className="login-content__full-button"
                        onClick={goToLogin}
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