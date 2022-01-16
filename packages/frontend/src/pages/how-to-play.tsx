import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Heading, Stack, VStack, Button, Box, Text } from '@chakra-ui/react';

const HowToPlay = () => {
  return (
    <DefaultLayout>
      <Box bg="tomato"> </Box>
      <Stack direction="column" spacing={4} justifyContent="space-between">
        <Box bg="tomato">
          <Heading> How To Play</Heading>
        </Box>
        <Text fontSize="6xl">This is how to play</Text>
        <VStack spacing={20} align="stretch">
          <Box h="40px">
            <Heading as="h1" size="lg">
              Scavenger Hunt
            </Heading>
            <Text fontSize="md">
              The leader chooses a household item for participants to gather. First to return with the item wins.
            </Text>
            <Button type="submit">Select</Button>
          </Box>
          <Box h="40px">
            <Heading as="h1" size="lg">
              Poser
            </Heading>
            <Text fontSize="md">
              The leader will strike a pose. All other participants must match the pose. First to match it wins.
            </Text>
            <Button type="submit">Select</Button>
          </Box>
          <Box h="40px">
            <Heading as="h1" size="lg">
              Scribbler
            </Heading>
            <Text fontSize="md">
              Each user will need a piece of paper. The leader will draw a picture. First participant to match the
              drawing wins.
            </Text>
            <Button type="submit">Select</Button>
          </Box>
          <Box h="40px">
            <Heading as="h1" size="lg">
              Speller
            </Heading>
            <Text fontSize="md">
              The leader will say a four letter or less word. All other participants must spell out the word using their
              body a la YMCA style. First to spell it wins.
            </Text>
            <Button type="submit">Select</Button>
          </Box>
        </VStack>
      </Stack>
    </DefaultLayout>
  );
};

export default HowToPlay;
