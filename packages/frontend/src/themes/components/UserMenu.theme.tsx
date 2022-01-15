export const UserMenuTheme = {
  baseStyle: ({ colorMode }) => {
    const color = colorMode === 'dark' ? 'fg.100' : 'fg.900';
    const brand = colorMode === 'dark' ? 'brand.700' : 'brand.300';
    const background = colorMode === 'dark' ? 'bg.700' : 'bg.300';
    const backgroundHover = colorMode === 'dark' ? 'brand.600' : 'brand.400';
    const backgroundActive = colorMode === 'dark' ? 'brand.500' : 'brand.500';
    return {
      shadow: 'base',
      '.user-menu-button': {
        background: brand,
        borderRightRadius: '0',
        svg: {
          color: color,
        },
        _hover: {
          background: backgroundHover,
        },
        _active: {
          background: backgroundActive,
        },
      },
      '.user-menu-info-bar': {
        borderRightRadius: 'xl',
        color,
        background,
      },
      '.user-menu-list': {
        border: 'none',
        background,
        p: {
          fontWeight: 'bold',
          color: brand,
        },
        button: {
          _active: {
            background: backgroundActive,
          },
        },
      },
      '.mobile-navigation': {
        display: 'none',
      },
      '@media only screen and (max-width: 480px)': {
        '.user-menu-button': {
          borderRadius: 'xl',
        },
        '.user-menu-info-bar': {
          display: 'none',
        },
        '.desktop-navigation': {
          display: 'none',
        },
        '.mobile-navigation': {
          display: 'flex',
        },
      },
    };
  },
};
