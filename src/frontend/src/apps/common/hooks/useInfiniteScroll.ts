import { useState } from "react";
import { infiniteScrollCallBackType } from "../../../lib/types/infiniteScroll";
import useOnMount from "./useOnMount";

const useInfiniteScroll = (apiCallback: infiniteScrollCallBackType) => {
  const [elems, setElems] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [loadDone, setLoadDone] = useState<boolean>(false);

  useOnMount(() => {
    loadData();
  });

  const loadData = async () => {
    const [additionalList, isDone] = await apiCallback(page + 1);
    if (isDone) setLoadDone(true);
    setElems([...elems, ...additionalList]);
    setPage(page + 1);
  };

  const loadMore = (ev: any) => {
    if (loadDone) return;
    setTimeout(async () => {
      await loadData();
      ev.target.complete();
    }, 500);
  };

  return { elems, loadDone, loadMore };
};

export default useInfiniteScroll;
