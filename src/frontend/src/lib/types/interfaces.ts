export interface Cloth {
  id: number;
  image: string;
  category: category;
  tags: Set<string>;
}

export interface Tags {
  [key: string]: { id: number; selected: boolean };
}
export interface Tag {
  name: string;
  id: number;
  categori_id?: number;
  select?: boolean;
}

export interface BoardConfig {
  width: number;
  height: number;
  clothWidth: number;
  clothHeight: number;
}

export interface Codi {
  id: number;
  top: string | null;
  bottom: string | null;
  cap: string | null;
  footwear: string | null;
}

export interface CodiTemplate {
  id?: number;
  clothes: CodiCloth[];
}

export type category = "상의" | "하의" | "신발" | "모자";

export interface CodiCloth {
  id?: number;
  category: category;
  image: string;
  positionX: number;
  positionY: number;
}

export interface StyleQs {
  mid: number;
  qid: number;
  weight: number;
  height: number;
  nickname: string;
  ans_count: number;
  body_type: number;
  post_date: string;
  end_date: string;
  tpo: string;
  comments: string;
}

export interface StyleAns {
  id: number;
  nickname: string;
  rank: string;
  top: string | null;
  bottom: string | null;
  cap: string | null;
  footwear: string | null;
  comments: string;
  codiTemplate: CodiTemplate;
}

export interface StyleQDetail {
  que: StyleQs;
  ans: StyleAns[];
}
