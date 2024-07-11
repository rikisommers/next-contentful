// app/api/route.js

import { serialize } from "cookie";
// app/api/check-auth/route.js

import { parse } from 'cookie';

export async function GET(request) {
  const cookies = parse(request.headers.get('cookie') || '');
  if (cookies[process.env.PASSWORD_COOKIE_NAME] === 'true') {
    return new Response("Authenticated", { status: 200 });
  } else {
    return new Response("Not authenticated", { status: 401 });
  }
}

export async function POST(request) {
  const data = await request.json();
  const password = data.password;
  const cookie = serialize(process.env.PASSWORD_COOKIE_NAME, "true", {
    httpOnly: true,
    path: "/",
  });

  if (process.env.PAGE_PASSWORD !== password) {
    console.log('incorrect');
    return new Response("incorrect password", {
      status: 401,
    });
  }
  console.log('correct');

  return new Response("password correct", {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
