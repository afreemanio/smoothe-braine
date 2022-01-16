import React from 'react';

import { Button, Checkbox, Input, Stack } from '@chakra-ui/react';

const CreateLobbyTool = () => {
  return (
    <Stack direction="column" spacing={4} display="flex" width="100%" justifyContent="space-between">
      <Input placeholder="enter your nickname" />
      <Checkbox defaultIsChecked>Private Lobby</Checkbox>
      <Button>Create Lobby</Button>
    </Stack>
  );
};

export default CreateLobbyTool;
