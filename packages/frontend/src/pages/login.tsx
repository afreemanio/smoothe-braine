import React, { SyntheticEvent } from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Input, Button, Stack } from '@chakra-ui/react';
import fetch from 'node-fetch';

import { LoginValues, UserSchema } from '@libs/shared';
import { useDispatch } from '@stores/StateProvider';

const Login = () => {
  const Login = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // const data = EventTarget &
    //   (typeof event.target & {
    //     username: { value: string };
    //     password: { value: string };
    //   }) = event.target;

    // fetch('/api/login', {
    //   body: {
    //     username: data.username.value,
    //     password: data.password.value,
    //   },
    // });

    useDispatch({
      authentication: {
        token: '',
      },
    });
  };

  return (
    <DefaultLayout>
      <Stack direction="column" spacing={4} onSubmit={(event: SyntheticEvent) => Login(event)}>
        <Input type="text" autoComplete="username" placeholder="username" />
        <Input type="text" autoComplete="password" placeholder="password" />
        <Button type="submit">Login</Button>
      </Stack>
    </DefaultLayout>
  );
};

export default Login;
