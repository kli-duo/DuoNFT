/* eslint-disable react/jsx-no-literals */
import Cookies from "js-cookie";
import React from "react";
import { Button, Input, LottieAnimation } from "web-ui";

import type { User } from "../api/v2";
import { apiV2 } from "../api/v2";
import { parseJwt } from "../util/auth";

import styles from "./Demo.module.scss";
import { useQuery } from "./async";
import { Cookie, useCookie } from "./cookie";
import lottieDuoWaving from "./duo-waving.lottie.json";

const LoginForm = ({
  onSignIn,
}: {
  onSignIn: (identifier: string, password: string) => Promise<void>;
}) => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const loginResult = useQuery<unknown>(
    [identifier, password],
    () => onSignIn(identifier, password),
    {
      enabled: false,
    },
  );

  return (
    <div className={styles.wrap}>
      <h1>Sign in</h1>
      <form
        className={styles.login}
        onSubmit={async e => {
          e.preventDefault();
          await loginResult.refetch();
        }}
      >
        <Input
          onChange={e => setIdentifier(e.currentTarget.value)}
          placeholder="Email or username"
          type="text"
          value={identifier}
        />
        <Input
          onChange={e => setPassword(e.currentTarget.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <Button
          color="macaw"
          submitting={loginResult.isLoading}
          type="submit"
          variant="solid"
        >
          Sign In
        </Button>
      </form>
      {loginResult.isError ? "Sign in failed!" : null}
    </div>
  );
};

const UserProfile = ({
  onSignOut,
  user,
}: {
  onSignOut: () => void;
  user: User;
}) => (
  <div className={styles.wrap}>
    <LottieAnimation
      animationData={lottieDuoWaving}
      className={styles.duo}
      isPlaying={true}
      loop={true}
    />
    <h1>{`Hello, ${user.username}!`}</h1>
    <Button
      color="macaw"
      onClick={() => {
        onSignOut();
      }}
      type="submit"
      variant="solid"
    >
      Sign Out
    </Button>
  </div>
);

const Demo = () => {
  const { removeCookie } = useCookie(Cookie.Jwt);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const jwt = Cookies.get(Cookie.Jwt);
    if (jwt) {
      (async () => {
        const userId = Number(parseJwt(jwt).payload.sub);
        const apiUser = await apiV2.getUser(userId);
        setUser(apiUser);
      })();
    }
  }, []);

  return user ? (
    <UserProfile
      onSignOut={() => {
        setUser(undefined);
        removeCookie();
      }}
      user={user}
    />
  ) : (
    <LoginForm
      onSignIn={async (identifier, password) => {
        const apiUser = await apiV2.login({
          identifier,
          password,
        });
        setUser(apiUser);
      }}
    />
  );
};

export default Demo;
