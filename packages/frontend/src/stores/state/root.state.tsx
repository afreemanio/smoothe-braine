import { cookieStorage } from '@libs/utility/src/cookie-storage';
import { useRef } from 'react';

import { AuthState, hydrateAuthStore } from './auth.state';
import { hydrateLobbyStore, LobbyState } from './lobby.state';
import { UserState, hydrateUserStore } from './user.state';

export interface RootState {
  authentication: Partial<AuthState>;
  user: Partial<UserState>;
  lobby: Partial<LobbyState>;
}

export type StateSelector = <K extends keyof RootState>(selector: K) => RootState[K];

export interface RootStore {
  useState: StateSelector;
  useDispatch: (state: Partial<RootState>) => void;
}

export const useHydrate = ({ state, cookies }): RootStore => {
  const storeRef = useRef({
    authentication: hydrateAuthStore({ state: state?.authentication ?? null, cookies }),
    user: hydrateUserStore({ state: state?.user ?? null, cookies }),
    lobby: hydrateLobbyStore({ state: state?.lobby ?? null, cookies }),
  });

  return {
    useState: (selector) => storeRef.current[selector],
    useDispatch: (_state: Partial<RootState>) => {
      for (const _store in _state) {
        cookieStorage.setCookie(_store, JSON.stringify(_state[_store]));
        storeRef.current[_store] = {
          ...storeRef.current[_store],
          ..._state,
        };
      }
    },
  };
};
