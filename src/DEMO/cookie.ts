import Cookies from "js-cookie";
import React from "react";

export enum Cookie {
  Jwt = "jwt_token",
}

const DOMAIN = window.location.host.includes("duolingo.com")
  ? ".duolingo.com"
  : window.location.host.includes("duolingo.cn")
  ? ".duolingo.cn"
  : window.location.hostname;

const EXPIRE_DAYS = 365;

/**
 * FOR DEMO PURPOSES ONLY.
 * Doesn't handle cookies set by requests.
 * Doesn't handle multiple hooks on the same cookie.
 * Likely has other bugs.
 */
export const useCookie = (name: Cookie) => {
  const [, forceUpdate] = React.useState(0);

  const cookie = Cookies.get(name);
  const removeCookie = () => {
    Cookies.remove(name);
    forceUpdate(n => n + 1);
  };
  const setCookie = (
    value: string,
    options?: {
      SameSite: "Lax";
    },
  ) => {
    const cookieSettings = { domain: DOMAIN, expires: EXPIRE_DAYS, ...options };
    Cookies.set(name, value, cookieSettings);
    forceUpdate(n => n + 1);
  };

  return {
    cookie,
    removeCookie,
    setCookie,
  };
};
