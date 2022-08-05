export interface Cloth {
  id: number;
  image: string;
  category: category;
  tags: Set<string>;
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
  top: string;
  bottom: string;
}

export interface CodiTemplate {
  id?: number;
  clothes: CodiCloth[];
}

export type category = "상의" | "하의";

export interface CodiCloth {
  id?: number;
  category: category;
  image: string;
  positionX: number;
  positionY: number;
}

export interface StyleQs {
  id: number;
  weight: number;
  bodyType: number;
  postDate: string;
  endDate: string;
  tpo: string;
  comments: string;
}

export interface StyleAns {
  nickname: string;
  rank: string;
  codi: Codi;
  comments: string;
  codiTemplate: CodiTemplate;
}

export interface StyleQDetail {
  que: StyleQs;
  ans: StyleAns[];
}
