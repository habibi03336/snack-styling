import { useEffect, useState } from "react";
import { infiniteScrollCallBackType } from "../../../lib/types/infiniteScroll";

const useInfiniteScroll = (apiCallback: infiniteScrollCallBackType) => {
  const [elems, setElems] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [loadDone, setLoadDone] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const [additionalList, isDone] = await apiCallback();
      if (isDone) setLoadDone(true);
      setElems([...elems, ...additionalList]);
    })();
  }, [page]);

  const loadMore = () => {
    if (loadDone) return;
    setPage(page + 1);
  };

  return { elems, loadDone, loadMore };
};

export default useInfiniteScroll;
