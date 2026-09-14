import type { User } from '../types/User';

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleWindow = Window & {
  google?: {
    accounts?: {
      id?: {
        initialize: (config: {
          client_id: string;
          callback: (response: GoogleCredentialResponse) => void;
        }) => void;
        prompt: () => void;
      };
    };
  };
};

export function signInWithGoogle(): Promise<User> {
  return new Promise((resolve, reject) => {
    const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!googleId) {
      reject(new Error('Google Client ID is not configured.'));
      return;
    }

    const google = (window as GoogleWindow).google;

    if (!google?.accounts?.id) {
      reject(new Error('Google Identity Services is not loaded.'));
      return;
    }

    google.accounts.id.initialize({
      client_id: googleId,
      callback: async ({ credential }) => {
        try {
          const response = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential }),
          });

          const result = await response.json() as {
            user?: User;
            error?: string;
          };

          if (!response.ok || !result.user) {
            throw new Error(result.error ?? 'Google sign-in failed.');
          }

          resolve(result.user);
        } catch (error) {
          reject(
            error instanceof Error
              ? error
              : new Error('Google sign-in failed.'),
          );
        }
      },
    });

    google.accounts.id.prompt();
  });
}