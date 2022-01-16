import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Stack } from '@chakra-ui/react';
import JoinTool from '@components/game/JoinTool';
import CreateLobbyTool from '@components/game/CreateLobbyTool';

const Index = () => {
  return (
    <DefaultLayout>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <JoinTool />
        <CreateLobbyTool />
      </Stack>
    </DefaultLayout>
  );
};

export default Index;
