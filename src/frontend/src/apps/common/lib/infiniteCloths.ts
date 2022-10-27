import * as I from "../../../lib/types/interfaces";
import { GET_CLOTHS } from "../../../lib/api/cloth";

async function infiniteCloths(page: number, userId: number) {
  const res = await GET_CLOTHS(userId, page);
  const data = res.data.clothList as I.Cloth[];
  data.forEach((elem) => (elem.tags = new Set(elem.tags)));
  const isDone = res.data.curPage === res.data.pageCnt;
  return [data, isDone] as [[], boolean];
}

export default infiniteCloths;
