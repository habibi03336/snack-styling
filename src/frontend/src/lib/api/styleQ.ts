import client from "./client";
import address from "./address";

const baseURL = address["api"] + "/board";
export const GET_STYLEQS = (page: number) =>
  client.get(baseURL + `/question/?page=${page}`);

export const GET_STYLEQ = (id: number) =>
  client.get(baseURL + `/question/${id}`);

interface StyleQData {
  id: number;
  end_date: string;
  tpo: number;
  comments: string;
}
export const POST_STYLEQ = (styleQData: StyleQData) =>
  client.post(baseURL + "/question", styleQData);

interface StyleAnsData {
  mid: number;
  qid: number;
  top: number | null;
  bottom: number | null;
  cap: number | null;
  footwear: number | null;
  comments?: string;
}

export const POST_STYLE_ANSWER = (styleAnsData: StyleAnsData) =>
  client.post(baseURL + "/answer", styleAnsData);

export const ADOPT_ANSWER = (answerId: number) => {
  client.patch(baseURL + `/answer/adopt/${answerId}`);
};
