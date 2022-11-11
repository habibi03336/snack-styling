import { atom } from "recoil";
import { GET_NOTIFICATIONS } from "../../../lib/api/notification";
import * as I from "../../../lib/types/interfaces";

export const alarmsAtom = atom<I.Alarm[]>({
  key: "Alarms/alarm",
  default: [],
  effects: [
    ({ setSelf }) => {
      (async () => {
        const res = await GET_NOTIFICATIONS();
        const data = res.data.notificationResponses as I.Alarm[];
        setSelf(data);
      })();
    },
  ],
});
