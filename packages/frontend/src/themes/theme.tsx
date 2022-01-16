import { mode } from '@chakra-ui/theme-tools';
import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import { baseTheme } from './base.theme';

export const theme: ThemeConfig = extendTheme(
  {
    styles: {
      global: (props) => ({
        // ...mode(lightTheme.styles.global, darkTheme.styles.global)(props),
      }),
    },
    colors: {},
  },
  baseTheme,
);
