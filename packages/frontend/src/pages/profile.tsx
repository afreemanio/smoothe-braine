import React from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Heading, Stack } from '@chakra-ui/react';

const Profile = () => {
  return (
    <DefaultLayout>
      <Stack direction="column" spacing={4} justifyContent="space-between">
        <Heading>Profile</Heading>
      </Stack>
    </DefaultLayout>
  );
};

export default Profile;
