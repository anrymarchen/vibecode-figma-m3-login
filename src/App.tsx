import { useEffect, useState } from 'react';

import {
  deleteCurrentUser,
  forgotPassword,
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
  register,
  updateCurrentUser,
} from './api/api';

import { signInWithGoogle } from './api/google';
import type { User } from './types/User';

import { AccountScreen } from './screens/AccountScreen';
import { DeleteAccountScreen } from './screens/DeleteAccountScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';

import './App.css';

type Screen = 'login' | 'register' | 'account' | 'delete' | 'forgot-password';

function getErrorMessage(
  reason: unknown,
  fallback: string,
) {
  return reason instanceof Error
    ? reason.message
    : fallback;
}

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((current) => {
        setUser(current);
        setScreen('account');
      })
      .catch(() => undefined);
  }, []);

  const logout = async () => {
    await logoutUser();

    setUser(null);
    setScreen('login');
  };

  const submitLogin = async (
    event: React.FormEvent,
    login: string,
    password: string,
    keepLoggedIn: boolean,
  ) => {
    event.preventDefault();
    setError('');

    try {
      const current = await loginUser(
        login,
        password,
        keepLoggedIn,
      );

      setUser(current);
      setScreen('account');
    } catch (reason) {
      setError(
        getErrorMessage(reason, 'Unable to log in.'),
      );
    }
  };

  const submitGoogleLogin = async () => {
  setError('');

  try {
    const current = await signInWithGoogle();

    setUser(current);
    setScreen('account');
  } catch (reason) {
    setError(
      getErrorMessage(reason, 'Unable to sign in with Google.'),
    );
  }
};

const submitForgotPassword = async (
  event: React.FormEvent,
  login: string,
) => {
  event.preventDefault();
  setError('');
  setMessage('');

  try {
    const result = await forgotPassword(login);
    setMessage(result);
  } catch (reason) {
    setError(getErrorMessage(reason, 'Unable to reset password.'));
  }
};

  const submitRegistration = async (
    event: React.FormEvent,
    registrationLogin: string,
    registrationPassword: string,
    repeatPassword: string,
  ) => {
    event.preventDefault();
    setError('');

    try {
      const current = await register(
        registrationLogin,
        registrationPassword,
        repeatPassword,
      );

      setUser(current);
      setScreen('account');
    } catch (reason) {
      setError(
        getErrorMessage(
          reason,
          'Unable to create account.',
        ),
      );
    }
  };

  const saveAccount = async (
    event: React.FormEvent,
    codename1: string,
    codename2: string,
  ) => {
    event.preventDefault();
    setError('');

    try {
      const current = await updateCurrentUser(
        codename1,
        codename2,
      );

      setUser(current);
      setError('Changes saved.');
    } catch (reason) {
      setError(
        getErrorMessage(
          reason,
          'Unable to save changes.',
        ),
      );
    }
  };

  const deleteAccount = async () => {
    setError('');

    try {
      await deleteCurrentUser();

      setUser(null);
      setScreen('login');
    } catch (reason) {
      setError(
        getErrorMessage(
          reason,
          'Unable to delete account.',
        ),
      );
    }
  };

  const goToLogin = () => {
    setError('');
    setMessage('');
    setScreen('login');
  };

  const goToForgotPassword = () => {
    setError('');
    setMessage('');
    setScreen('forgot-password');
  };

  const goToRegister = () => {
    setError('');
    setScreen('register');
  };

  const goToDelete = () => {
    setError('');
    setScreen('delete');
  };

  const cancelDelete = () => {
    setError('');
    setScreen('account');
  };

  if (screen === 'account' && user) {
    return (
      <AccountScreen
        user={user}
        error={error}
        saveAccount={saveAccount}
        logout={logout}
        goToDelete={goToDelete}
      />
    );
  }

  if (screen === 'delete' && user) {
    return (
      <DeleteAccountScreen
        error={error}
        deleteAccount={deleteAccount}
        cancel={cancelDelete}
      />
    );
  }

  if (screen === 'forgot-password') {
    return (
      <ForgotPasswordScreen
        message={message}
        error={error}
        submitForgotPassword={submitForgotPassword}
        goToLogin={goToLogin}
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen
        error={error}
        setError={setError}
        submitRegistration={submitRegistration}
        goToLogin={goToLogin}
      />
    );
  }

  return (
    <LoginScreen
      error={error}
      setError={setError}
      submitLogin={submitLogin}
      submitGoogleLogin={submitGoogleLogin}
      goToForgotPassword={goToForgotPassword}
      goToRegister={goToRegister}
  />
  );
}

export default App;