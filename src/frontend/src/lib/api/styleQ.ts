import client from "./client";
import address from "./address";

const baseURL = address["api"] + "/board";
export const GET_STYLEQS = (
  page: number,
  query?: { tpo?: 0 | 1 | 2 | 3 | 4; adopt?: 0 | 1 }
) => {
  let url = baseURL + `/question/?page=${page}`;
  if (query)
    Object.entries(query).forEach(([filter, value]) => {
      if (!value) return;
      url += `&${filter}=${value}`;
    });
  return client.get(url);
};

export const GET_STYLEQ = (id: number) =>
  client.get(baseURL + `/question/${id}`);

interface StyleQData {
  endDate: string;
  tpo: number;
  comments: string;
}
export const POST_STYLEQ = (styleQData: StyleQData) =>
  client.post(baseURL + "/question", styleQData);

interface StyleAnsData {
  qid: number;
  codi: {
    top: number | null;
    bottom: number | null;
    cap: number | null;
    footwear: number | null;
  };
  comments?: string;
}

export const PATCH_STYLEQ = (qid: number, styleQData: StyleQData) =>
  client.patch(baseURL + `/question/${qid}`, styleQData);

export const POST_STYLE_ANSWER = (styleAnsData: StyleAnsData) =>
  client.post(baseURL + "/answer", styleAnsData);

export const ADOPT_ANSWER = (answerId: number) =>
  client.patch(baseURL + `/answer/adopt/${answerId}`);
export const DELETE_QUESTION = (qid: number) =>
  client.delete(baseURL + `/question/${qid}`);

export const DELETE_ANSWER = (answerId: number) =>
  client.delete(baseURL + `/answer/${answerId}`);
