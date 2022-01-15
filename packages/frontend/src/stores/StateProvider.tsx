import { createContext, useContext } from 'react';

import { RootState, RootStore, useHydrate } from './state/root.state.ts';

export const RootContext = createContext<RootStore>(null);

interface StateProviderProps {
  children: React.ReactNode;
  cookies: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: RootState;
}

export const StateProvider = ({ children, cookies, state }: StateProviderProps) => {
  const store = useHydrate({ state, cookies });
  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
};

export const useState = <K extends keyof RootState>(selector: K) => {
  const store = useContext(RootContext);
  return store.useState(selector);
};

export const useDispatch = (state: Partial<RootState>) => {
  const store = useContext(RootContext);
  return store.useDispatch(state);
};
