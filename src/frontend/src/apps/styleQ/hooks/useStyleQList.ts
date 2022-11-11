import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { GET_STYLEQS } from "../../../lib/api/styleQ";
import * as I from "../../../lib/types/interfaces";
import { filterState, pageState, styleQState } from "../state/styleQ";

const useStyleQList = () => {
  const [styleQs, setStyleQs] = useRecoilState(styleQState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [page, setPage] = useRecoilState(pageState);
  const [loadDone, setLoadDone] = useState<boolean>(false);

  const loadData = async () => {
    const res = await GET_STYLEQS(page + 1, filter);
    const data = res.data.questionResponses as I.StyleQ[];
    if (page === res.data.totalPage) {
      setLoadDone(true);
    }
    setStyleQs([...styleQs, ...data]);
    setPage(page + 1);
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadMore = (ev: any) => {
    if (loadDone) return;
    setTimeout(async () => {
      await loadData();
      ev.target.complete();
    }, 500);
  };

  const filterChange = (e: any, type: "tpo" | "adopt") => {
    if (type === "tpo") {
      setFilter((filter) => {
        return {
          ...filter,
          tpo: e.detail.value === -1 ? undefined : e.detail.value,
        };
      });
    } else {
      setFilter((filter) => {
        return {
          ...filter,
          adopt: e.detail.value === -1 ? undefined : e.detail.value,
        };
      });
    }
  };

  return { styleQs, filterChange, loadDone, loadMore };
};

export default useStyleQList;
