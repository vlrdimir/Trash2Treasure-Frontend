import { auth } from "./server/auth";

export default auth;

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const matcher = ["/((?!api|_next/static|_next/image|.*\\.png$).*)"];
