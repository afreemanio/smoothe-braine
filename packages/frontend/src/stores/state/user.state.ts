import { cookieStorage } from '@libs/utility/src/cookie-storage';

const KEY = 'user';

export interface UserState {
  username: string;
  user_id: string;
  email: string;
  roles: string[];
}

const defaultState: UserState = {
  username: null,
  user_id: null,
  email: null,
  roles: [],
};

export const createUserState = (state: UserState = defaultState) => {
  return state;
};

export const hydrateUserStore = ({ state, cookies }: { state; cookies?: string }) => {
  const persistedState = cookieStorage.getCookie(KEY);
  const _state = JSON.parse(state) ?? (cookies ? JSON.parse(persistedState) : defaultState);
  return createUserState(_state);
};
