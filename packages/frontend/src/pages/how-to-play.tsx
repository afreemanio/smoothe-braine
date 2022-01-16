import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Heading, Stack } from '@chakra-ui/react';

const HowToPlay = () => {
  return (
    <DefaultLayout>
      <Stack direction="column" spacing={4} justifyContent="space-between">
        <Heading>How To Play</Heading>
      </Stack>
    </DefaultLayout>
  );
};

export default HowToPlay;
