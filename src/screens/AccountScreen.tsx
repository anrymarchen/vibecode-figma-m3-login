import { useState, type FormEvent } from 'react';

import { Button } from '../components/Button/Button';
import { Grid } from '../layout/grid';
import { StackedCard } from '../components/StackedCard/StackedCard';
import { TextField } from '../components/TextField/TextField';

type User = {
  id: string;
  login: string;
  codename1: string;
  codename2: string;
  deletable: boolean;
  createdAt: string;
  updatedAt: string;
};

type AccountScreenProps = {
  user: User;
  error: string;
  saveAccount: (
    event: FormEvent,
    codename1: string,
    codename2: string,
  ) => void;
  logout: () => void;
  goToDelete: () => void;
};

export function AccountScreen({
  user,
  error,
  saveAccount,
  logout,
  goToDelete,
}: AccountScreenProps) {
  const [codename1, setCodename1] = useState(
    user.codename1,
  );
  const [codename2, setCodename2] = useState(
    user.codename2,
  );

  const savedCodename1 = user.codename1;
  const savedCodename2 = user.codename2;

  const hasChanges =
    codename1 !== savedCodename1 ||
    codename2 !== savedCodename2;

  const handleSubmit = (event: FormEvent) => {
    saveAccount(event, codename1, codename2);
  };

  return (
    <main className="login-page">
      <Grid className="login-grid">
        <StackedCard
          className="login-card"
          layout="Slot"
          content={
            <div className="login-content">
              <header className="login-content__header account-info__header">
                <Button
                  label="Log out"
                  showIcon={false}
                  size="xsmall"
                  variant="text"
                  type="button"
                  onClick={logout}
                  className="account-info__header-button account-info__header-button--logout"
                />

                <span className="account-info__title">
                  Account info
                </span>

                {user.deletable && (
                  <Button
                    label="Delete"
                    showIcon={false}
                    size="xsmall"
                    variant="text"
                    type="button"
                    onClick={goToDelete}
                    className="account-info__header-button account-info__header-button--delete"
                  />
                )}
              </header>

              <div className="login-content__body">
                <form onSubmit={handleSubmit}>
                  <Grid
                    variant="inlay"
                    className="account-info__grid"
                  >
                    <div className="account-info__metadata account-info__metadata--created">
                      <span className="account-info__metadata-label">
                        Created
                      </span>

                      <span className="account-info__metadata-value">
                        {new Date(
                          user.createdAt,
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="account-info__metadata account-info__metadata--updated">
                      <span className="account-info__metadata-label">
                        Updated
                      </span>

                      <span className="account-info__metadata-value">
                        {new Date(
                          user.updatedAt,
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="account-info__credentials">
                      <div className="account-info__credential">
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

                      <div className="account-info__credential">
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

                    <div className="account-info__field">
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
                          setCodename1(event.target.value)
                        }
                        onValueChange={setCodename1}
                      />
                    </div>

                    <div className="account-info__field">
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
                          setCodename2(event.target.value)
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