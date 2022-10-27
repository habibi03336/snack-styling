import { DELETE_CODI } from "../../../lib/api/codi";
import * as I from "../../../lib/types/interfaces";
import useInfiniteScroll from "./useInfiniteScroll";
import infiniteCodis from "../lib/infiniteCodis";

const useCodis = () => {
  const { elems, loadMore, loadDone } = useInfiniteScroll(infiniteCodis);

  const deleteCodi = async (codiId: number) => {
    const res = await DELETE_CODI(codiId);
    if (res.status >= 300) return;
    window.location.href = "/closet/codi";
  };

  return {
    deleteCodi,
    codis: elems as I.CodiTemplate[],
    loadMore,
    loadDone,
  };
};

export default useCodis;
