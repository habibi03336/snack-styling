import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Observable } from "rxjs";
import { GET_STYLEQ, PATCH_STYLEQ, POST_STYLEQ } from "../../../lib/api/styleQ";
import user from "../../common/state/user";
import useOnMount from "../../common/hooks/useOnMount";

interface tpoTagSelection {
  [key: string]: boolean;
}

const dateToCompareNumber = (date: string) => Number(date.split("-").join(""));

const defaultTpos: tpoTagSelection = {
  데일리: false,
  소개팅: false,
  데이트: false,
  동창회: false,
  결혼식: false,
};

const tpoMapper = new Map<string, number>([
  ["데일리", 0],
  ["소개팅", 1],
  ["데이트", 2],
  ["동창회", 3],
  ["결혼식", 4],
]);

const useApplyForm = (updateId?: number) => {
  const [date, setDate] = useState<string>("");
  const [tpos, setTpos] = useState<tpoTagSelection>(defaultTpos);
  const [description, setDescription] = useState<string>("");
  const [notification, setNotification] = useState<string>("");

  useOnMount(() => {
    if (!updateId) return;
    (async () => {
      const res = await GET_STYLEQ(updateId);
      const data = res.data.question;
      setDate(data.endDate);
      setTpos({ ...tpos, [data.tpo]: true });
      setDescription(data.comments);
    })();
  });

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
    if (
      dateToCompareNumber(date) <
      dateToCompareNumber(new Date().toJSON().slice(0, 10))
    ) {
      setNotification("오늘 이전 날짜로는 설정할 수 없습니다.");
      return;
    }

    if (selectedTpo === "") {
      setNotification("TPO를 선택하여 주세요");
      return;
    }

    (async () => {
      const body = {
        endDate: date,
        tpo: tpoMapper.get(selectedTpo)!,
        comments: description,
      };

      // body.tpo = selectedTpo;
      const res_ = updateId
        ? await PATCH_STYLEQ(updateId, body)
        : await POST_STYLEQ(body);
      const data = res_.data;
      subscriber.next(updateId || data.qid);
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
    notification,
  };
};

export default useApplyForm;
