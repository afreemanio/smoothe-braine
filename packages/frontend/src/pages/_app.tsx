import React from 'react';
import App, { AppContext, AppProps } from 'next/app';

import { ChakraSSR } from './_chakra';
import { StateProvider } from 'frontend/src/stores/StateProvider';
import { cookieStorage } from '@libs/utility/src/cookie-storage';

const MyApp = (context: AppProps & { cookies: string; state }) => {
  const { Component, pageProps, cookies, state } = context;
  return (
    <ChakraSSR cookies={cookies}>
      <StateProvider cookies={cookies} state={state}>
        <Component {...pageProps} />
      </StateProvider>
    </ChakraSSR>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const { req } = context.ctx;
  const state = cookieStorage.get(context.ctx);
  return {
    ...appProps,
    cookies: req?.headers.cookie ?? '',
    state,
  };
};

export default MyApp;
