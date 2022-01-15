export const IconLinkTheme = {
  baseStyle: ({ colorMode }) => {
    const color = colorMode === 'dark' ? 'fg.100' : 'bg.700';
    const brand = colorMode === 'dark' ? 'brand.600' : 'brand.300';
    const colorHover = colorMode === 'dark' ? 'accent.300' : 'accent.700';
    const background = colorMode === 'dark' ? 'bg.800' : 'bg.50';
    const backgroundHover = colorMode === 'dark' ? 'brand.500' : 'brand.500';
    const backgroundActive = colorMode === 'dark' ? 'brand.300' : 'brand.600';
    return {
      _hover: {
        textDecoration: 'none',
        color: colorHover,
      },
    };
  },
};
