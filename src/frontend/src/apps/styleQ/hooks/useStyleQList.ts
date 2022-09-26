import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { GET_STYLEQS } from "../../../lib/api/styleQ";
import * as I from "../../../lib/types/interfaces";
import { filterState, pageState, styleQState } from "../state/styleQ";

const useStyleQList = () => {
  const [styleQs, setStyleQs] = useRecoilState(styleQState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [page, setPage] = useRecoilState(pageState);
  const [loadDone, setLoadDone] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const res = await GET_STYLEQS(page, filter);
      const data = res.data.questionResponses as I.StyleQ[];
      if (page === res.data.totalPage) setLoadDone(true);
      setStyleQs([...styleQs, ...data]);
    })();
  }, [page, filter]);

  const loadMore = () => {
    if (loadDone) return;
    setPage(page + 1);
  };

  return { styleQs, setFilter, loadDone, loadMore };
};

export default useStyleQList;
