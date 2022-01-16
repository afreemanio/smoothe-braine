import React, { SyntheticEvent } from 'react';

import { ClientConfig } from '@libs/config';
import { LoginResponseValues } from '@libs/shared';
import DefaultLayout from '@components/layout/DefaultLayout';
import { Input, Button, Stack } from '@chakra-ui/react';
import fetch from 'node-fetch';

import { LoginValues } from '@libs/shared';
import { useDispatch } from '@stores/StateProvider';

import qs from 'qs';

const Login = () => {
  const dispatch = useDispatch();

  const Login = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const body: LoginValues = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      username: (event.currentTarget as any).username.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      password: (event.currentTarget as any).password.value,
    };

    const req = await fetch(`http://localhost:${ClientConfig.PORT}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: qs.stringify(body),
    });

    if (req.status === 200) {
      const res: LoginResponseValues = await req.json();

      dispatch({
        user: {
          username: res.username,
          user_id: res.userId,
          email: res.email,
          roles: res.roles,
        },
        authentication: {
          token: res.session.sessionId,
        },
      });
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={Login}>
        <Stack direction="column" spacing={4}>
          <Input type="text" autoComplete="username" placeholder="username" name="username" />
          <Input type="password" autoComplete="password" placeholder="password" name="password" />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </DefaultLayout>
  );
};

export default Login;
