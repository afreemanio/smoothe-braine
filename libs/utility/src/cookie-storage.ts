import { parseCookies, setCookie as setNookies } from 'nookies';

const get = (context = null) => {
  const cookies = parseCookies(context);
  if (cookies) return cookies;
  return null;
};

const getCookie = (name, context = null) => {
  const cookies = parseCookies(context);
  if (cookies[name]) return cookies[name];
  return null;
};

export const setCookie = (key, value, context = null) => {
  setNookies(context, key, value, {
    maxAge: 30 * 24 * 60 * 60,
    sameSite: 'strict',
    secure: true,
    path: '/',
  });
};

export const cookieStorage = {
  get,
  getCookie,
  setCookie,
};
