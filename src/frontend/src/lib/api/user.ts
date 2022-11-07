import client from "./client";
import address from "./address";

const baseURL = address["api"] + "/profile";

export interface IMemberInfo {
  age: number | null;
  gender: number | null;
  height: number | null;
  nickname: string | null;
  weight: number | null;
}

export const GET_MEMBER_DETAIL = () => client.get(baseURL);

export const PATCH_MEMBER_DETAIL = (memberInfo: IMemberInfo) =>
  client.patch(baseURL, memberInfo);

export const GET_USER_QUESTIONS = () => client.get(baseURL + "/questions");

export const GET_USER_ANSWERS = () => client.get(baseURL + "/answers");

export const GET_PROFILE = () => client.get(baseURL);

export const POST_SUGGESTION = (text: string) =>
  client.post(baseURL + "/suggestions", { contents: text });
