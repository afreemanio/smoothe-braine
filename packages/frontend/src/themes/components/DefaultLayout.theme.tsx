export const DefaultLayoutTheme = {
  baseStyle: ({ colorMode }) => {
    // const color = colorMode === 'dark' ? 'fg.100' : 'bg.700';
    const background = colorMode === 'dark' ? 'brand.500' : 'bg.500';

    return {
      navigation: {
        '.desktop-navigation': {
          display: 'flex',
        },
        '.mobile-navigation': {
          display: 'none',
          '.user-menu-info-bar': {
            borderRadius: 'xl',
            // color,
            background,
            // svg: {
            //   color,
            // },
          },
        },
        '@media only screen and (max-width: 480px)': {
          '.desktop-navigation': {
            display: 'none',
          },
          '.mobile-navigation': {
            display: 'flex',
          },
        },
      },
    };
  },
};
