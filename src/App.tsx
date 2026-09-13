import { useEffect, useState } from 'react';

import {
  deleteCurrentUser,
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
  register,
  updateCurrentUser,
} from './api/api';

import type { User } from './types/User';

import { AccountScreen } from './screens/AccountScreen';
import { DeleteAccountScreen } from './screens/DeleteAccountScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';

import './App.css';

type Screen = 'login' | 'register' | 'account' | 'delete';

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
  ) => {
    event.preventDefault();
    setError('');

    try {
      const current = await loginUser(login, password);

      setUser(current);
      setScreen('account');
    } catch (reason) {
      setError(
        getErrorMessage(reason, 'Unable to log in.'),
      );
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
    setScreen('login');
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
      goToRegister={goToRegister}
    />
  );
}

export default App;