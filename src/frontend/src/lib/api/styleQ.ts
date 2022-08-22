import client from "./client";
import address from "./address";

const baseURL = address["api"];
export const getStyleQs = (page: number) =>
  client.get(baseURL + `/board/load/?page=${page}`);

export const getStyleQ = (id: number) =>
  client.get(baseURL + `/board/detail/?id=${id}`);

interface StyleQData {
  id: number;
  end_date: string;
  tpo: number;
  comments: string;
}
export const postStyleQ = (styleQData: StyleQData) =>
  client.post(baseURL + "/board/question", styleQData);

interface StyleAnsData {
  mid: number;
  qid: number;
  top: number;
  bottom: number;
  comments?: string;
}

export const postStyleAns = (styleAnsData: StyleAnsData) =>
  client.post(baseURL + "/board/answer", styleAnsData);
