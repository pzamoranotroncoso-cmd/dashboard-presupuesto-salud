import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';

import firebaseConfigJson from '../../firebase-applet-config.json';

export const firebaseConfig = {
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) || firebaseConfigJson.apiKey,
  authDomain: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN) || firebaseConfigJson.authDomain,
  projectId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_PROJECT_ID) || firebaseConfigJson.projectId,
  storageBucket: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET) || firebaseConfigJson.storageBucket,
  messagingSenderId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) || firebaseConfigJson.messagingSenderId,
  appId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_APP_ID) || firebaseConfigJson.appId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Proveedor estándar de Google (sin scopes sensibles de Drive para evitar pantalla de 'App no verificada')
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const TOKEN_KEY = 'google_access_token';
const TOKEN_EXP_KEY = 'google_access_token_exp';

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const expStr = localStorage.getItem(TOKEN_EXP_KEY);
  if (expStr && Number(expStr) < Date.now()) {
    // Token has expired
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXP_KEY);
    return null;
  }
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
};

const storeToken = (token: string) => {
  if (typeof window === 'undefined') return;
  const exp = Date.now() + 50 * 60 * 1000; // 50 minutos de validez
  sessionStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXP_KEY, String(exp));
};

const clearStoredToken = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXP_KEY);
};

let isSigningIn = false;
let cachedAccessToken: string | null = getStoredToken();

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      const activeToken = cachedAccessToken || getStoredToken();
      if (activeToken && isValidGoogleAccessToken(activeToken)) {
        cachedAccessToken = activeToken;
        if (onAuthSuccess) onAuthSuccess(user, activeToken);
      } else {
        // No hay token de Google OAuth activo en almacenamiento
        cachedAccessToken = null;
        clearStoredToken();
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      clearStoredToken();
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string | null } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || null;
    if (token) {
      cachedAccessToken = token;
      storeToken(token);
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
  return cachedAccessToken || getStoredToken();
};

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  if (token) {
    storeToken(token);
  } else {
    clearStoredToken();
  }
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  clearStoredToken();
};

/**
 * Valida si un token de acceso es un token real de Google OAuth
 */
export const isValidGoogleAccessToken = (token: string | null | undefined): boolean => {
  if (!token) return false;
  const t = token.trim();
  return t.length > 15 && t !== 'token_valido' && !t.startsWith('mock_');
};
