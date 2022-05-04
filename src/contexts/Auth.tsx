import { createContext, ReactNode, useEffect, useState  } from 'react';

import { nlwHeatApi } from '../services/nlwHeatApi';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user?: User;
  signInURL: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthResponse = {
  token: string;
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}

const TOKEN_KEY = '@NlwHeat:token';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();

  const signInURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`;

  async function signIn(githubCode: string) {
    try {
      const { data } = await nlwHeatApi.post<AuthResponse>('/authenticate', { code: githubCode });

      const { token, user } = data;

      localStorage.setItem(TOKEN_KEY, token);

      nlwHeatApi.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      // TODO: Tratar os erros
    }
  }

  async function signOut() {
    setUser(undefined);
    localStorage.removeItem(TOKEN_KEY);
  }

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      nlwHeatApi.defaults.headers.common.authorization = `Bearer ${token}`;

      loadProfile();
    }

    async function loadProfile() {
      try {
        const { data } = await nlwHeatApi.get<User>('/profile');

        setUser(data);
      } catch (error) {
        // TODO: Tratar os erros
      }
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;

    const hasGithubAuthCode = url.includes('code=');

    if (hasGithubAuthCode) {
      const [urlWithoutCode, code] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(code);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInURL, user, signOut }}>
      { children }
    </AuthContext.Provider>
  );
}
