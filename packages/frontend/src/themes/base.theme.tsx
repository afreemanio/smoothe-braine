import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import { DefaultLayoutTheme } from './components/DefaultLayout.theme';

export const colors = {
  // TODO
};

const themeColors = {
  // TODO
};

export const baseTheme: ThemeConfig = extendTheme({
  components: {
    DefaultLayoutTheme,
  },
  styles: {
    global: {
      a: {
        textDecoration: 'none',
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  colors: {
    ...colors,
    ...themeColors,
  },
});
