import React from 'react';

import { Box, Button, ButtonGroup, Input, Stack } from '@chakra-ui/react';

const JoinTool = () => {
  return (
    <Box>
      <Stack direction="column" spacing={4} display="flex" width="100%">
        <Input placeholder="enter your nickname" />
        <ButtonGroup>
          <Stack direction="column" spacing={4} display="flex" width="100%">
            <Button variantColor="blue">Join</Button>
            <Button variantColor="blue">Create Private Lobby</Button>
          </Stack>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default JoinTool;
