import { IonPage, IonContent } from "@ionic/react";
import Header from "../../common/components/Header";
import ListDiv from "../../common/components/ListDiv";
import AlarmCard from "../components/AlarmCard";
import { alarmsAtom } from "../state/alarms";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router";
import {
  PATCH_ALL_NOTIFICATIONS,
  PATCH_NOTIFICATION,
} from "../../../lib/api/notification";
import RowFiller from "../../common/components/RowFiller";
const Alarms = () => {
  const [alarms, setAlarms] = useRecoilState(alarmsAtom);
  const history = useHistory();

  return (
    <IonPage>
      <Header text="알림" type="title" />
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            color: "gray",
          }}
          onClick={async () => {
            await PATCH_ALL_NOTIFICATIONS();
            setAlarms([]);
          }}
        >
          전체 읽음
        </div>
        <RowFiller px={5} />
        <ListDiv>
          {
            //render styleQs
            alarms.map((elem) => (
              <AlarmCard
                key={elem.nid}
                info={elem}
                onClickCard={async () => {
                  history.push(`/styleQ/${elem.qid}`);
                  setAlarms(alarms.filter((el) => el.nid !== elem.nid));
                  const res = await PATCH_NOTIFICATION(elem.nid);
                }}
                onClickX={async () => {
                  const res = await PATCH_NOTIFICATION(elem.nid);
                  setAlarms(alarms.filter((el) => el.nid !== elem.nid));
                }}
              />
            ))
          }
        </ListDiv>
      </IonContent>
    </IonPage>
  );
};

export default Alarms;
