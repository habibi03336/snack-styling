import { useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { POST_STYLEQ } from "../../../lib/api/styleQ";
import user from "../../common/state/user";

interface tpoTagSelection {
  [key: string]: boolean;
}

const defaultTpos: tpoTagSelection = {
  데일리: false,
  소개팅: false,
  데이트: false,
  동창회: false,
  결혼식: false,
};

const tpoMapper = new Map<string, number>([
  ["데일리", 1],
  ["소개팅", 2],
  ["데이트", 3],
  ["동창회", 4],
  ["결혼식", 5],
]);

const useApplyForm = () => {
  const [userState, _] = useRecoilState(user);
  const [date, setDate] = useState<string>("");
  const [tpos, setTpos] = useState<tpoTagSelection>(defaultTpos);
  const [description, setDescription] = useState<string>("");

  const selectTpo = (tpoName: string) => {
    const newTpos = { ...tpos };
    Object.keys(newTpos).forEach((tpoName) => {
      newTpos[tpoName] = false;
    });
    newTpos[tpoName] = true;
    setTpos(newTpos);
  };

  const clearTpoSelection = () => {
    const newTpos = { ...tpos };
    Object.keys(newTpos).forEach((tpoName) => {
      newTpos[tpoName] = false;
    });
    setTpos(newTpos);
  };

  const uploadStyleQ = new Observable<number>((subscriber) => {
    const selectedTpo = Object.keys(tpos).find((key) => tpos[key]) || "";
    (async () => {
      const body = {
        end_date: date,
        tpo: tpoMapper.get(selectedTpo)!,
        comments: description,
        id: userState.id!,
      };

      // body.tpo = selectedTpo;
      const res_ = await POST_STYLEQ(body);
      const data = res_.data;
      subscriber.next(data.qid);
      subscriber.complete();
    })();
  });

  return {
    date,
    setDate,
    tpos,
    selectTpo,
    clearTpoSelection,
    description,
    setDescription,
    uploadStyleQ,
  };
};

export default useApplyForm;
