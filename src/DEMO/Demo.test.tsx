import { render, screen } from "@testing-library/react";
import { Base64 } from "js-base64";
import Cookies from "js-cookie";
import React from "react";
import * as WebUi from "web-ui";

import { apiV2 } from "../api/v2";

import Demo from "./Demo";
import { Cookie } from "./cookie";

const sampleJwt = [
  JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  }),
  JSON.stringify({
    ist: 0,
    name: "duo",
    sub: -1,
  }),
  "signature",
]
  .map(part => Base64.encode(part))
  .join(".");

afterEach(() => {
  Cookies.remove(Cookie.Jwt);
});

beforeEach(() => {
  // LottieAnimation has its own implementation of web-lottie,
  // which we need to mock out separately from the peer web-lottie.
  jest.spyOn(WebUi, "LottieAnimation").mockReturnValue(null);
});

test("shows expected message when logged in", async () => {
  Cookies.set(Cookie.Jwt, sampleJwt);
  jest.spyOn(apiV2, "getUser").mockResolvedValue({
    id: "-1",
    username: "Duo",
  });

  render(<Demo />);
  // We should see the welcome text after the mock getUser() call finishes.
  await expect(screen.findByText("Hello, Duo!")).resolves.toBeInstanceOf(
    HTMLHeadingElement,
  );
});

test("shows expected message when logged out", async () => {
  render(<Demo />);
  await expect(screen.findByText("Sign in")).resolves.toBeInstanceOf(
    HTMLHeadingElement,
  );
});
