import React, { SyntheticEvent } from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Input, Button, Stack } from '@chakra-ui/react';
import fetch from 'node-fetch';

import { LoginValues, UserSchema } from '@libs/shared';
import { useDispatch } from '@stores/StateProvider';

const CreateAccount = () => {
  const CreateAccount = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    useDispatch({
      authentication: {
        token: '',
      },
    });
  };

  return (
    <DefaultLayout>
      <Stack direction="column" spacing={4} onSubmit={(event: SyntheticEvent) => CreateAccount(event)}>
        <Input type="text" autoComplete="username" placeholder="email" />
        <Input type="text" autoComplete="username" placeholder="username" />
        <Input type="text" autoComplete="password" placeholder="password" />
        <Input type="text" autoComplete="confirmPassword" placeholder="Confirm Password" />
        <Button type="submit">Login</Button>
      </Stack>
    </DefaultLayout>
  );
};

export default CreateAccount;
