import { createContext, useCallback, useMemo, useState } from 'react';
import { apiClient } from '../api/client.js';

const STORAGE_KEY = 'aprendo_contigo_admin_token';

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEY));
  const [user, setUser] = useState(() => decodeToken(sessionStorage.getItem(STORAGE_KEY)));

  const login = useCallback(async (email, password) => {
    const result = await apiClient.post('/auth/login', { email, password });
    const payload = decodeToken(result.token);

    if (!payload || payload.rol !== 'admin') {
      throw new Error('Esta cuenta no tiene permisos de administrador');
    }

    sessionStorage.setItem(STORAGE_KEY, result.token);
    setToken(result.token);
    setUser(payload);
    return payload;
  }, []);

  const register = useCallback((nombre, email, password) => {
    return apiClient.post('/users', { nombre, email, password });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(user);
  const isAdmin = Boolean(user && user.rol === 'admin' && user.exp * 1000 > Date.now());

  const value = useMemo(
    () => ({ token, user, isAuthenticated, isAdmin, login, register, logout }),
    [token, user, isAuthenticated, isAdmin, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
