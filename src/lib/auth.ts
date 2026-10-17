import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';

import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Proveedor estándar de Google (sin permisos sensibles que bloqueen la ventana)
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
provider.addScope('https://www.googleapis.com/auth/drive.readonly');
provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');


let isSigningIn = false;
let cachedAccessToken: string | null = typeof window !== 'undefined' ? sessionStorage.getItem('google_access_token') : null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken || 'token_valido');
    } else {
      cachedAccessToken = null;
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('google_access_token');
      }
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string | null } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || 'token_valido';
    cachedAccessToken = token;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('google_access_token', token);
    }
    return { user: result.user, accessToken: token };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken || 'token_valido';
};

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('google_access_token');
  }
};

/**
 * Valida si un token de acceso es un token real de Google OAuth
 */
export const isValidGoogleAccessToken = (token: string | null | undefined): boolean => {
  if (!token) return false;
  const t = token.trim();
  return t.length > 15 && t !== 'token_valido' && !t.startsWith('mock_');
};
