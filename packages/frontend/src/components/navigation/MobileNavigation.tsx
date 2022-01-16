import React from 'react';
import { useMultiStyleConfig } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Link as ChakraLink, Stack } from '@chakra-ui/layout';

interface MobileNavigationProps {
  children?: React.ReactNode;
}

export const MobileNavigation = (props: MobileNavigationProps) => {
  const { mobileNavigation } = useMultiStyleConfig('MobileNavigationTheme', {});

  return (
    <Box sx={mobileNavigation}>
      <Stack direction="row">
        <Box>
          <ChakraLink as={Link} href="/">
            Home
          </ChakraLink>
        </Box>
        <Box>
          <ChakraLink as={Link} href="/">
            Find
          </ChakraLink>
        </Box>
        <Box>
          <ChakraLink as={Link} href="/">
            Home
          </ChakraLink>
        </Box>
      </Stack>
    </Box>
  );
};
