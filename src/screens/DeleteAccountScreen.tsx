import { Button } from '../components/Button/Button';
import { Grid } from '../layout/grid';
import { StackedCard } from '../components/StackedCard/StackedCard';

type DeleteAccountScreenProps = {
  error: string;
  deleteAccount: () => void;
  cancel: () => void;
};

export function DeleteAccountScreen({
  error,
  deleteAccount,
  cancel,
}: DeleteAccountScreenProps) {
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
                      onClick={cancel}
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