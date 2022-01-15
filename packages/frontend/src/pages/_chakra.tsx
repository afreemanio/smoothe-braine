import React from 'react';
import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';

import { theme } from 'themes/theme';

interface ChakraSSRProps {
  children?: React.ReactNode;
  cookies: string;
}

export const ChakraSSR = ({ cookies, children }: ChakraSSRProps) => {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider resetCSS colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps = ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
};
