import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Heading, Stack, Text} from '@chakra-ui/react';

const HowToPlay = () => {
  return (
    <DefaultLayout>
      <Stack direction="column" spacing={4} justifyContent="space-between">
        <Heading>How To Play</Heading>
        <Text fontSize="6xl">This is how to play</Text>
      </Stack>
    </DefaultLayout>
  );
};

export default HowToPlay;
