import { cookieStorage } from '@libs/utility/src/cookie-storage';

const KEY = 'lobby';

export interface LobbyState {
  lobby_id: string;
}

const defaultState: LobbyState = {
  lobby_id: null,
};

export const createLobbyState = (state: LobbyState = defaultState) => {
  return state;
};

export const hydrateLobbyStore = ({ state, cookies }: { state; cookies?: string }) => {
  const persistedState = cookieStorage.getCookie(KEY);
  const _state = JSON.parse(state) ?? (cookies ? JSON.parse(persistedState) : defaultState);
  return createLobbyState(_state);
};
