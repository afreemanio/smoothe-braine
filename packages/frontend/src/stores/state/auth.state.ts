import { cookieStorage } from '@libs/utility/src/cookie-storage';

const KEY = 'authentication';

export interface AuthState {
  token: string;
}

const defaultState: AuthState = {
  token: null,
};

export const createAuthState = (state: AuthState = defaultState) => {
  return state;
};

export const hydrateAuthStore = ({ state, cookies }: { state; cookies?: string }) => {
  const persistedState = cookieStorage.getCookie(KEY);
  const _state = JSON.parse(state) ?? (cookies ? JSON.parse(persistedState) : defaultState);
  return createAuthState(_state);
};
