import Axios from "axios";

export interface User {
  id: number;
  username: string;
}

const APIV2_ORIGIN =
  process.env.NODE_ENV === "development" ? "" : "//api.duolingo.com";

const USER_FIELDS = ["id", "username"].join(",");

const client = Axios.create({
  baseURL: `${APIV2_ORIGIN}/2017-06-30`,
});

const getUser = async (userId: number) =>
  (
    await client.get<User>(`/users/${userId}`, {
      params: {
        fields: USER_FIELDS,
      },
      withCredentials: true,
    })
  ).data;

const login = async (params: { identifier: string; password: string }) =>
  (
    await client.post<User>("/login", params, {
      params: { fields: USER_FIELDS },
    })
  ).data;

export const apiV2 = {
  getUser,
  login,
};
