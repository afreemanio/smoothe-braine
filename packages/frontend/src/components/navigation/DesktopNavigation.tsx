import React from 'react';
import { useMediaQuery, useMultiStyleConfig, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Link as ChakraLink, Stack } from '@chakra-ui/layout';

interface DesktopNavigationProps {
  children?: React.ReactNode;
}

export const DesktopNavigation = (props: DesktopNavigationProps) => {
  const { desktopNavigation } = useMultiStyleConfig('DesktopNavigationTheme', {});
  const [media480] = useMediaQuery('(max-width: 480px)');

  return (
    <Box sx={desktopNavigation}>
      <Stack direction="row" spacing={4}>
        <Box>
          <ChakraLink as={Link} href="/">
            Home
          </ChakraLink>
        </Box>
        <Box>
          <ChakraLink as={Link} href="/">
            How To Play
          </ChakraLink>
        </Box>
      </Stack>
    </Box>
  );
};
