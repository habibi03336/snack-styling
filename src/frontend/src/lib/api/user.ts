import client from "./client";
import address from "./address";

const baseURL = address["api"] + "/profile";

export interface IMemberInfo {
  age: number | null;
  gender: 1 | 2 | null;
  height: number | null;
  id: number;
  nickname: string | null;
  weight: number | null;
}

export const PATCH_MEMBER_DETAIL = (memberInfo: IMemberInfo) =>
  client.post(baseURL, memberInfo);

export const GET_USER_QUESTIONS = () => client.get(baseURL + "/questions");

export const GET_USER_ANSWERS = () => client.get(baseURL + "/answers");

export const GET_PROFILE = () => client.get(baseURL);

export const POST_SUGGESTION = (text: string) =>
  client.post(baseURL + "/suggestions", { contents: text });
