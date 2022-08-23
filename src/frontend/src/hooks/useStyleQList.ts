import { useState, useEffect } from "react";
import { getStyleQs } from "../lib/api/styleQ";
import * as I from "../interfaces";

const useStyleQList = () => {
  const [styleQs, setStyleQs] = useState<I.StyleQs[]>([]);
  const [page, setPage] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      console.log("there");
      const res = await getStyleQs(page);
      const data = res.data as I.StyleQs[];
      setLoad(false);
      setStyleQs([...styleQs, ...data]);
    })();
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
    setLoad(true);
  };

  return { styleQs, load, loadMore };
};

export default useStyleQList;
