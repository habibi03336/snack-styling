import { DELETE_CLOTH } from "../../../lib/api/cloth";
import * as I from "../../../lib/types/interfaces";
import { useRecoilValue } from "recoil";
import user from "../../common/state/user";
import useInfiniteScroll from "../../common/hooks/useInfiniteScroll";
import infiniteCloths from "../../common/lib/infiniteCloths";

const useCloths = (userId?: number, selectedCategory?: string) => {
  const userState = useRecoilValue(user);

  const { elems, loadMore, loadDone } = useInfiniteScroll((page: number) => {
    return infiniteCloths(
      page,
      userId ? userId : userState.id,
      selectedCategory ? selectedCategory : undefined
    );
  }, selectedCategory);

  const deleteCloth = async (clothId: number) => {
    const res = await DELETE_CLOTH(clothId);
    if (res.status >= 300) return;
    window.location.href = "/closet/cloth";
  };

  return {
    deleteCloth,
    clothes: elems as I.Cloth[],
    loadMore,
    loadDone,
  };
};

export default useCloths;
