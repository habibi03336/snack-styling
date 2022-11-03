import { useEffect, useState } from "react";
import { infiniteScrollCallBackType } from "../../../lib/types/infiniteScroll";

const useInfiniteScroll = (
  apiCallback: infiniteScrollCallBackType,
  dependency?: any
) => {
  const [elems, setElems] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [loadDone, setLoadDone] = useState<boolean>(false);

  useEffect(() => {
    loadData(true);
  }, [dependency]);

  const loadData = async (refresh = false) => {
    if (refresh) {
      const [additionalList, isDone] = await apiCallback(1);
      if (isDone) setLoadDone(true);
      else setLoadDone(false);
      setElems([...additionalList]);
      setPage(1);
    } else {
      const [additionalList, isDone] = await apiCallback(page + 1);
      if (isDone) setLoadDone(true);
      setElems([...elems, ...additionalList]);
      setPage(page + 1);
    }
  };

  const loadMore = (ev: any) => {
    if (loadDone) return;
    setTimeout(async () => {
      await loadData();
      ev.target.complete();
    }, 500);
  };

  return { elems, loadDone, loadMore, setElems, setLoadDone, setPage };
};

export default useInfiniteScroll;
