import { useState, useEffect } from "react";
import { GET_STYLEQS } from "../../../lib/api/styleQ";
import * as I from "../../../lib/types/interfaces";

const useStyleQList = () => {
  const [styleQs, setStyleQs] = useState<I.StyleQs[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadDone, setLoadDone] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await GET_STYLEQS(page);
      const data = res.data as I.StyleQs[];
      setStyleQs([...styleQs, ...data]);
    })();
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
    setLoadDone(true);
  };

  return { styleQs, loadDone, loadMore };
};

export default useStyleQList;
