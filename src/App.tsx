import { useEffect, useState } from 'react';

import GoogleLogo from './assets/icons/g-logo-color.svg?react';

import { Button } from './components/Button/Button';
import { Checkbox } from './components/Checkbox/Checkbox';
import { Grid } from './layout/grid';
import { StackedCard } from './components/StackedCard/StackedCard';
import { TextField } from './components/TextField/TextField';

import './App.css';
import './auth.css';

type User = {
  id: string;
  login: string;
  codename1: string;
  codename2: string;
  deletable: boolean;
  createdAt: string;
  updatedAt: string;
};

type Screen = 'login' | 'register' | 'account' | 'delete';

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const result = await response.json() as T & {
    error?: string;
  };

  if (!response.ok) {
    throw new Error(result.error ?? 'Request failed.');
  }

  return result;
}

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [codename1, setCodename1] = useState('');
  const [codename2, setCodename2] = useState('');

  const [savedCodename1, setSavedCodename1] = useState('');
  const [savedCodename2, setSavedCodename2] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    request<{ user: User }>('/api/auth/me')
      .then(({ user: current }) => {
        setUser(current);
        setCodename1(current.codename1);
        setCodename2(current.codename2);
        setSavedCodename1(current.codename1);
        setSavedCodename2(current.codename2);
        setScreen('account');
      })
      .catch(() => undefined);
  }, []);

  const logout = async () => {
    await request('/api/auth/logout', {
      method: 'POST',
    });

    setUser(null);
    setLogin('');
    setPassword('');
    setScreen('login');
  };

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const result = await request<{ user: User }>(
        '/api/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({
            login,
            password,
          }),
        },
      );

      setUser(result.user);
      setCodename1(result.user.codename1);
      setCodename2(result.user.codename2);
      setSavedCodename1(result.user.codename1);
      setSavedCodename2(result.user.codename2);
      setScreen('account');
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'Unable to log in.',
      );
    }
  };

  const submitRegistration = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();
    setError('');

    try {
      const result = await request<{ user: User }>(
        '/api/auth/register',
        {
          method: 'POST',
          body: JSON.stringify({
            login,
            password,
            repeatPassword,
          }),
        },
      );

      setUser(result.user);
      setCodename1('');
      setCodename2('');
      setSavedCodename1('');
      setSavedCodename2('');
      setScreen('account');
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'Unable to create account.',
      );
    }
  };

  const saveAccount = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();
    setError('');

    try {
      const result = await request<{ user: User }>(
        '/api/users/me',
        {
          method: 'PATCH',
          body: JSON.stringify({
            codename1,
            codename2,
          }),
        },
      );

      setUser(result.user);
      setCodename1(result.user.codename1);
      setCodename2(result.user.codename2);
      setSavedCodename1(result.user.codename1);
      setSavedCodename2(result.user.codename2);
      setError('Changes saved.');
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'Unable to save changes.',
      );
    }
  };

  const deleteAccount = async () => {
    setError('');

    try {
      await request('/api/users/me', {
        method: 'DELETE',
      });

      setUser(null);
      setScreen('login');
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'Unable to delete account.',
      );
    }
  };

  /* ========================================
     1. Account Info Screen
     ======================================== */

  if (screen === 'account' && user) {
    const hasChanges =
      codename1 !== savedCodename1 ||
      codename2 !== savedCodename2;

    return (
      <main className="login-page">
        <Grid className="login-grid">
          <StackedCard
            className="login-card"
            layout="Slot"
            content={
              <div className="login-content">
                <header
                  className="login-content__header"
                  style={{ position: 'relative' }}
                >
                  <Button
                    label="Log out"
                    showIcon={false}
                    size="xsmall"
                    variant="text"
                    type="button"
                    onClick={logout}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      margin: 0,
                    }}
                  />

                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Account info
                  </span>

                  {user.deletable && (
                    <Button
                      label="Delete"
                      showIcon={false}
                      size="xsmall"
                      variant="text"
                      type="button"
                      onClick={() => {
                        setError('');
                        setScreen('delete');
                      }}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        margin: 0,
                      }}
                    />
                  )}
                </header>

                <div className="login-content__body">
                  <form onSubmit={saveAccount}>
                    <Grid
                      variant="inlay"
                      className="account-info__grid"
                    >
                      <div
                        style={{
                          gridColumn: '1 / 3',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            color:
                              'var(--md-sys-color-on-surface-variant)',
                            fontSize:
                              'var(--md-sys-typescale-body-small-font-size)',
                            lineHeight:
                              'var(--md-sys-typescale-body-small-line-height)',
                            letterSpacing:
                              'var(--md-sys-typescale-body-small-letter-spacing)',
                          }}
                        >
                          Created
                        </span>

                        <span
                          style={{
                            color:
                              'var(--md-sys-color-on-surface)',
                            fontSize:
                              'var(--md-sys-typescale-body-large-font-size)',
                            lineHeight:
                              'var(--md-sys-typescale-body-large-line-height)',
                            letterSpacing:
                              'var(--md-sys-typescale-body-large-letter-spacing)',
                          }}
                        >
                          {new Date(
                            user.createdAt,
                          ).toLocaleString()}
                        </span>
                      </div>

                      <div
                        style={{
                          gridColumn: '3 / 5',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            color:
                              'var(--md-sys-color-on-surface-variant)',
                            fontSize:
                              'var(--md-sys-typescale-body-small-font-size)',
                            lineHeight:
                              'var(--md-sys-typescale-body-small-line-height)',
                            letterSpacing:
                              'var(--md-sys-typescale-body-small-letter-spacing)',
                          }}
                        >
                          Updated
                        </span>

                        <span
                          style={{
                            color:
                              'var(--md-sys-color-on-surface)',
                            fontSize:
                              'var(--md-sys-typescale-body-large-font-size)',
                            lineHeight:
                              'var(--md-sys-typescale-body-large-line-height)',
                            letterSpacing:
                              'var(--md-sys-typescale-body-large-letter-spacing)',
                          }}
                        >
                          {new Date(
                            user.updatedAt,
                          ).toLocaleString()}
                        </span>
                      </div>

                      {/* Login + Password row */}
                      <div
                        style={{
                          gridColumn: '1 / 5',
                          display: 'grid',
                          gridTemplateColumns:
                            'repeat(4, minmax(0, 1fr))',
                          columnGap: '32px',
                          padding: '16px 0',
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            gridColumn: '1 / 3',
                            width: '100%',
                            minWidth: 0,
                          }}
                        >
                          <TextField
                            id="account-login"
                            labelText="Login"
                            placeholderText="Login"
                            style="Outlined"
                            state="Enabled"
                            value={user.login}
                            showSupportingText={false}
                            trailingAction="clear"
                            showTrailingIcon
                            onChange={() => undefined}
                            onValueChange={() => undefined}
                          />
                        </div>

                        <div
                          style={{
                            gridColumn: '3 / 5',
                            width: '100%',
                            minWidth: 0,
                          }}
                        >
                          <TextField
                            id="account-password"
                            labelText="Password"
                            placeholderText="Password"
                            style="Outlined"
                            state="Enabled"
                            type="password"
                            value="••••••••"
                            showSupportingText={false}
                            trailingAction="clear"
                            showTrailingIcon
                            onChange={() => undefined}
                            onValueChange={() => undefined}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          gridColumn: '1 / 5',
                          width: '100%',
                          minWidth: 0,
                        }}
                      >
                        <TextField
                          id="codename-1"
                          labelText="Codename 1"
                          placeholderText="Codename 1"
                          style="Filled"
                          state="Enabled"
                          value={codename1}
                          showSupportingText={false}
                          trailingAction="clear"
                          showTrailingIcon
                          onChange={(event) =>
                            setCodename1(
                              event.target.value,
                            )
                          }
                          onValueChange={setCodename1}
                        />
                      </div>

                      <div
                        style={{
                          gridColumn: '1 / 5',
                          width: '100%',
                          minWidth: 0,
                        }}
                      >
                        <TextField
                          id="codename-2"
                          labelText="Codename 2"
                          placeholderText="Codename 2"
                          style="Filled"
                          state="Enabled"
                          value={codename2}
                          showSupportingText={false}
                          trailingAction="clear"
                          showTrailingIcon
                          onChange={(event) =>
                            setCodename2(
                              event.target.value,
                            )
                          }
                          onValueChange={setCodename2}
                        />
                      </div>
                    </Grid>

                    <div className="login-content__actions">
                      <div
                        className="login-content__error"
                        role="alert"
                      >
                        {error === 'Changes saved.'
                          ? 'Changes saved.'
                          : error === 'wrong username!'
                            ? 'Error: wrong username!'
                            : ''}
                      </div>

                      <div className="login-content__action-list">
                        <Button
                          label="Save changes"
                          showIcon={false}
                          type="submit"
                          disabled={!hasChanges}
                          className="login-content__full-button"
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

  /* ========================================
     2. Delete Account Screen
     ======================================== */

  if (screen === 'delete' && user) {
    return (
      <main className="login-page">
        <Grid className="login-grid">
          <StackedCard
            className="login-card"
            layout="Slot"
            content={
              <div className="login-content">
                <header className="login-content__header">
                  Delete account
                </header>

                <div className="login-content__body">
                  <p className="login-content__subtitle">
                    This action cannot be undone. All of your
                    account data will be permanently deleted.
                  </p>

                  <div className="login-content__actions">
                    <div
                      className="login-content__error"
                      role="alert"
                    >
                      {error}
                    </div>

                    <div className="login-content__action-list">
                      <Button
                        label="Delete account"
                        showIcon={false}
                        type="button"
                        className="login-content__full-button"
                        onClick={deleteAccount}
                      />

                      <Button
                        label="Cancel"
                        showIcon={false}
                        variant="outline"
                        type="button"
                        className="login-content__full-button"
                        onClick={() =>
                          setScreen('account')
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Grid>
      </main>
    );
  }

  /* ========================================
     3. Registration Screen
     ======================================== */

  if (screen === 'register') {
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
                    onClick={() => {
                      setError('');
                      setScreen('login');
                    }}
                  />

                  <span>Create account</span>
                </header>

                <div className="login-content__body">
                  <p className="login-content__subtitle">
                    Sign up for a new account
                  </p>

                  <form onSubmit={submitRegistration}>
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
                          setLogin(
                            event.target.value,
                          );
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
                          setPassword(
                            event.target.value,
                          );
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

  /* ========================================
     4. Restored Login Screen
     ======================================== */

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

                <form onSubmit={submitLogin}>
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
                        setLogin(
                          event.target.value,
                        );
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
                        onClick={() => {
                          setError('');
                          setScreen('register');
                        }}
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

export default App;