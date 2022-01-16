import React from 'react';
import { useMediaQuery, useMultiStyleConfig } from '@chakra-ui/react';
import { Box, Container } from '@chakra-ui/layout';

import { DesktopNavigation } from 'components/navigation/DesktopNavigation';
// import { MobileNavigation } from 'components/navigation/MobileNavigation';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;

  const { navigation } = useMultiStyleConfig('DefaultLayoutTheme', {});
  const [media480] = useMediaQuery('(max-width: 480px)');

  return (
    <Box sx={navigation}>
      <DesktopNavigation />
      {/* <MobileNavigation /> */}

      <Container maxWidth={media480 ? 'max' : '4xl'}>{children}</Container>
    </Box>
  );
};

export default DefaultLayout;
