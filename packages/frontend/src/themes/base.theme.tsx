import { ThemeConfig, extendTheme } from '@chakra-ui/react';

import { DefaultLayoutTheme } from './components/DefaultLayout.theme';
import { IconLinkTheme } from './components/IconLink.theme';
import { LightModeButtonTheme } from './components/LightModeButton.theme';
import { UploadToolTheme } from './components/UploadTool.theme';
import { UserMenuTheme } from './components/UserMenu.theme';

export const colors = {
  // TODO
};

const themeColors = {
  // TODO
};

export const baseTheme: ThemeConfig = extendTheme({
  components: {
    // TODO
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
