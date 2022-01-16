import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Heading } from '@chakra-ui/react';
import JoinTool from '@components/game/JoinTool';

const Index = () => {
  return (
    <DefaultLayout>
      <JoinTool />
    </DefaultLayout>
  );
};

export default Index;
