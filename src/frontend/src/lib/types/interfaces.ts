export interface Cloth {
  id: number;
  image: string;
  category: category;
  tags: Set<string>;
}

export interface Tags {
  [key: string]: { id: number; selected: boolean; categoryId?: number };
}
export interface Tag {
  name: string;
  id: number;
  category_id?: number;
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

export type category = "상의" | "하의" | "신발" | "모자" | "가방" | "아우터";

export interface CodiCloth {
  id?: number;
  category: category;
  image: string;
  positionX: number;
  positionY: number;
  size: number;
}

export interface StyleQ {
  adopt: number;
  mid: number;
  qid: number;
  weight: number;
  height: number;
  nickname: string;
  ansCount: number;
  body_type: number;
  post_date: string;
  endDate: string;
  tpo: string;
  comments: string;
}

export interface StyleAns {
  aid: number;
  mid: number;
  nickname: string;
  rank: string;
  adopt: 0 | 1;
  codi: {
    id: number;
    top: string | null;
    bottom: string | null;
    cap: string | null;
    footwear: string | null;
  };
  postDate: string;
  comments: string;
  codiTemplate: CodiTemplate;
}

export interface StyleQDetail {
  que: StyleQ;
  ans: StyleAns[];
}

export interface Alarm {
  nid: number;
  other: string;
  qid: number;
  tpo: string;
  type: number;
  user: string;
}

export interface Codiplan {
  codi: number;
  plan_date: string;
}
