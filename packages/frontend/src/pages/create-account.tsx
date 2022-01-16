import React, { SyntheticEvent } from 'react';

import DefaultLayout from '@components/layout/DefaultLayout';
import { Input, Button, Stack } from '@chakra-ui/react';
import fetch from 'node-fetch';

import { LoginResponseValues, CreateAccountValues, LoginValues } from '@libs/shared';
import { useDispatch } from '@stores/StateProvider';
import qs from 'qs';
import { ClientConfig } from '@libs/config';

const CreateAccount = () => {
  const dispatch = useDispatch();

  const CreateAccount = async (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const auth: LoginValues = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      username: (event.currentTarget as any).username.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      password: (event.currentTarget as any).password.value,
    };

    const body: CreateAccountValues = {
      ...auth,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      email: (event.currentTarget as any).email.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // username: (event.currentTarget as any).username.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // password: (event.currentTarget as any).password.value,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      confirmPassword: (event.currentTarget as any).confirmPassword.value,
    };

    const req = await fetch(`http://localhost:${ClientConfig.PORT}/api/v1/user`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: qs.stringify(body),
    });

    if (req.status === 200) {
      const req = await fetch(`http://localhost:${ClientConfig.PORT}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: qs.stringify(auth),
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
    }
  };
  return (
    <DefaultLayout>
      <form onSubmit={CreateAccount}>
        <Stack direction="column" spacing={4}>
          <Input type="text" autoComplete="email" placeholder="email" name="email" />
          <Input type="text" autoComplete="username" placeholder="username" name="username" />
          <Input type="password" autoComplete="password" placeholder="password" name="password" />
          <Input type="password" autoComplete="confirmPassword" placeholder="Confirm Password" name="confirmPassword" />
          <Button type="submit">Create Account</Button>
        </Stack>
      </form>
    </DefaultLayout>
  );
};

export default CreateAccount;
