import React from 'react';

import { Box, Button, ButtonGroup, Input, Stack } from '@chakra-ui/react';

const JoinTool = () => {
  return (
    <Stack direction="column" spacing={4} display="flex" width="100%">
      <Input placeholder="enter your nickname" />
      <Input placeholder="lobby code" />
      <Button variantColor="blue">Join</Button>
    </Stack>
  );
};

export default JoinTool;
