import client from "./client";
import address from "./address";

const baseURL = address["api"];

export interface ILoginInfo {
  email: string;
  pwd: string;
}

export const AUTH_LOGIN = (loginInfo: ILoginInfo) =>
  client.post(baseURL + `/accounts`, loginInfo);

export interface ISigninInfo {
  email: string;
  pwd: string;
}

export const AUTH_SIGNIN = (signinInfo: ISigninInfo) =>
  client.post(baseURL + `/accounts/register`, signinInfo);

export interface IMemberInfo {
  age: number | null;
  gender: 1 | 2 | null;
  height: number | null;
  id: number;
  nickname: string | null;
  weight: number | null;
}

export const PATCH_MEMBER_DETAIL = (memberInfo: IMemberInfo) =>
  client.post(baseURL + `/profile`, memberInfo);

export const GET_USER_QUESTIONS = () =>
  client.get(baseURL + `/profile/questions`);

export const GET_USER_ANSWERS = () => client.get(baseURL + `/profile/answers`);
