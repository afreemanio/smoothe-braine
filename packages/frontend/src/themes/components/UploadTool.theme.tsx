export const UploadToolTheme = {
  baseStyle: ({ colorMode }) => {
    return {
      '.upload-tool-bar': {
        '.upload-button': {
          shadow: 'base',
          borderRadius: 'xl',
          color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
          background: colorMode === 'dark' ? 'mint.700' : 'mint.300',
          _hover: {
            textDecoration: 'none',
            color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
            background: colorMode === 'dark' ? 'mint.600' : 'mint.400',
          },
          _focus: {
            textDecoration: 'none',
            color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
            background: colorMode === 'dark' ? 'mint.500' : 'mint.500',
          },
        },
        '.upload-tool-button-group': {
          borderRadius: 'xl',
          shadow: 'base',
          '.private-button': {
            borderLeftRadius: 'xl',
            borderRightRadius: '0',
            color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
            background: colorMode === 'dark' ? 'red.700' : 'red.300',
            _hover: {
              textDecoration: 'none',
              color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
              background: colorMode === 'dark' ? 'red.600' : 'red.400',
            },
            _focus: {
              textDecoration: 'none',
              color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
              background: colorMode === 'dark' ? 'red.500' : 'red.500',
            },
          },
          '.anonymous-button': {
            borderLeftRadius: '0',
            borderRightRadius: '0',
            color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
            background: colorMode === 'dark' ? 'purple.700' : 'purple.300',
            _hover: {
              textDecoration: 'none',
              color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
              background: colorMode === 'dark' ? 'purple.600' : 'purple.400',
            },
            _focus: {
              textDecoration: 'none',
              color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
              background: colorMode === 'dark' ? 'purple.500' : 'purple.500',
            },
          },
          '.password-input-group': {
            '.password-input': {
              borderLeftRadius: 'xl',
              borderRightRadius: '0',
            },
            '.password-button': {
              borderLeftRadius: '0',
              borderRightRadius: 'xl',
              color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
              background: colorMode === 'dark' ? 'purple.700' : 'purple.300',
              _hover: {
                textDecoration: 'none',
                color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
                background: colorMode === 'dark' ? 'purple.600' : 'purple.400',
              },
              _focus: {
                textDecoration: 'none',
                color: colorMode === 'dark' ? 'fg.100' : 'fg.900',
                background: colorMode === 'dark' ? 'purple.500' : 'purple.500',
              },
            },
          },
          // '.trash-button': {
          //   borderRadius: 'xl',
          //   color: colorMode === 'dark' ? 'red.800' : 'fg.50',
          //   background: colorMode === 'dark' ? 'red.600' : 'red.600',
          //   shadow: 'md',
          //   _hover: {
          //     textDecoration: 'none',
          //     color: colorMode === 'dark' ? 'red.800' : 'fg.100',
          //     background: colorMode === 'dark' ? 'red.500' : 'red.600',
          //   },
          //   _focus: {
          //     textDecoration: 'none',
          //     color: colorMode === 'dark' ? 'red.800' : 'fg.100',
          //     background: colorMode === 'dark' ? 'red.400' : 'red.600',
          //   },
          // },
        },
      },
    };
  },
};
