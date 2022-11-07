import { useEffect, useState } from "react";
import { defaultTemplate } from "../../../assets/codiTemplates";
import { GET_CODI } from "../../../lib/api/codi";
import { GET_CODIPLANS } from "../../../lib/api/codiplan";
import { makeCodiTemplate } from "../../../lib/process/codi";
import * as I from "../../../lib/types/interfaces";

const useHome = () => {
  const today = new Date();
  const [date, setDate] = useState<Date>(new Date());
  const [codiplan, setCodiplan] = useState<{ [key: string]: number }>({});
  const [codiSelected, setCodiSelected] = useState<I.CodiTemplate>();
  useEffect(() => {
    (async () => {
      const { data } = await GET_CODIPLANS(
        date.getFullYear(),
        date.getMonth() + 1
      );
      const newCodiplan: { [key: string]: number } = {};
      data.forEach((elem: I.Codiplan) => {
        const day = elem["plan_date"].split("-")[2] as string;
        newCodiplan[Number(day)] = elem.codi;
      });
      setCodiplan(newCodiplan);
    })();
  }, [date.getFullYear(), date.getMonth()]);

  useEffect(() => {
    (async () => {
      const codiId = codiplan[date.getDate()];
      if (!codiId) {
        setCodiSelected(undefined);
        return;
      }
      const { data } = await GET_CODI(codiId);
      const defaultCodi = makeCodiTemplate([data], defaultTemplate)[0];
      setCodiSelected(defaultCodi);
    })();
  }, [date, codiplan]);

  return {
    today,
    date,
    setDate,
    codiplan,
    setCodiplan,
    codiSelected,
  };
};

export default useHome;
