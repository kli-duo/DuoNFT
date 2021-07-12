import { Base64 } from "js-base64";

export const parseJwt = (jwt: string) => {
  const [headerJson, payloadJson, signature] = jwt
    .split(".")
    .map(part => Base64.decode(part));
  return {
    header: JSON.parse(headerJson),
    payload: JSON.parse(payloadJson),
    signature,
  };
};
