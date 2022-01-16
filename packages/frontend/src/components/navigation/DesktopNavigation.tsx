import React, { SyntheticEvent } from 'react';
import { useMultiStyleConfig } from '@chakra-ui/react';
import Link from 'next/link';
import { Box, Link as ChakraLink, Stack } from '@chakra-ui/layout';
import { useDispatch, useState } from '@stores/StateProvider';

interface DesktopNavigationProps {
  children?: React.ReactNode;
}

export const DesktopNavigation = (props: DesktopNavigationProps) => {
  const { desktopNavigation } = useMultiStyleConfig('DesktopNavigationTheme', {});

  const dispatch = useDispatch();

  const authentication = useState('authentication');
  const user = useState('user');

  const Logout = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch({
      authentication: {
        token: null,
      },
    });
  };

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
          {authentication.token ? (
            <>
              <Box>
                <ChakraLink as={Link} href="/profile">
                  {user.username}
                </ChakraLink>
              </Box>
              <Box>
                <ChakraLink as={Link} href="#" onClick={Logout}>
                  logout
                </ChakraLink>
              </Box>
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
