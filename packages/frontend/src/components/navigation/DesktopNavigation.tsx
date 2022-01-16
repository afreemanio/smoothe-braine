import React from 'react';
import { useMediaQuery, useMultiStyleConfig, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Link as ChakraLink, Stack } from '@chakra-ui/layout';
import { useState } from '@stores/StateProvider';

interface DesktopNavigationProps {
  children?: React.ReactNode;
}

export const DesktopNavigation = (props: DesktopNavigationProps) => {
  const { desktopNavigation } = useMultiStyleConfig('DesktopNavigationTheme', {});

  const authentication = useState('authentication');
  authentication.token = '2';

  return (
    <Box sx={desktopNavigation}>
      <Stack direction="row" paddingX={16} paddingY={8} justifyContent="space-between">
        <Stack direction="row" spacing={4}>
          <Box>
            <ChakraLink as={Link} href="/">
              Home
            </ChakraLink>
          </Box>
          <Box>
            <ChakraLink as={Link} href="/how-to-play">
              How To Play
            </ChakraLink>
          </Box>
        </Stack>
        <Stack direction="row" spacing={4}>
          <Box>
            <ChakraLink as={Link} href="/login">
              Login
            </ChakraLink>
          </Box>
          <Box>
            <ChakraLink as={Link} href="/create-account">
              Register
            </ChakraLink>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
