import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonLabel,
  IonRadio,
  IonInput,
  IonButton,
  IonContent,
  IonPage,
  IonRow,
} from "@ionic/react";
import useMemberRegist from "../hooks/useMemberRegist";
import Label from "../../common/components/Label";
import BottomButton from "../../common/components/BottomButton";
import Header from "../../common/components/Header";
import RowFiller from "../../common/components/RowFiller";

const MemberDetailRegist = () => {
  const { features, setFeatures, postSignin } = useMemberRegist();
  return (
    <IonPage>
      <Header type="back" text="정보입력" />
      <IonContent>
        <RowFiller px={5} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postSignin.subscribe({
              complete() {
                window.location.href = "/mypage";
              },
            });
          }}
        >
          <IonList>
            <RowFiller px={25} />
            <Label text="별명" />
            <IonInput
              onIonChange={(e) => {
                setFeatures({ ...features, nickname: e.detail.value! });
              }}
            />
            <RowFiller px={25} />
            <Label text="성별" />
            <IonRadioGroup
              value={features.gender}
              onIonChange={(e) =>
                setFeatures({ ...features, gender: e.detail.value })
              }
            >
              <IonRow>
                <IonItem>
                  <IonLabel>남성</IonLabel>
                  <IonRadio slot="start" value={1} />
                </IonItem>

                <IonItem>
                  <IonLabel>여성</IonLabel>
                  <IonRadio slot="start" value={2} />
                </IonItem>

                <IonItem>
                  <IonLabel>선택안함</IonLabel>
                  <IonRadio slot="start" value="none" />
                </IonItem>
              </IonRow>
            </IonRadioGroup>

            <RowFiller px={25} />
            <Label text="나이" />
            <IonInput
              min={5}
              max={99}
              type="number"
              value={features.age}
              placeholder="나이"
              onIonChange={(e) => {
                if (!e.detail.value) {
                  e.detail.value = null;
                  return;
                }
                setFeatures({
                  ...features,
                  age: parseInt(e.detail.value!),
                });
              }}
              clearInput
            />

            <RowFiller px={25} />
            <Label text="키(cm)" />
            <IonInput
              min={100}
              max={220}
              type="number"
              value={features.height}
              placeholder="키"
              onIonChange={(e) => {
                if (!e.detail.value) {
                  e.detail.value = null;
                  return;
                }
                setFeatures({
                  ...features,
                  height: parseInt(e.detail.value!),
                });
              }}
              clearInput
            />

            <RowFiller px={25} />
            <Label text="몸무게(kg)" />
            <IonInput
              min={20}
              max={200}
              type="number"
              value={features.weight}
              placeholder="몸무게"
              onIonChange={(e) => {
                if (!e.detail.value) {
                  e.detail.value = null;
                  return;
                }
                setFeatures({
                  ...features,
                  weight: parseInt(e.detail.value!),
                });
              }}
              clearInput
            />

            {/* <IonItemDivider>체형</IonItemDivider>
        <IonItem>
          <IonRadioGroup
            value={features.shape}
            onIonChange={(e) =>
              setFeatures({ ...features, shape: e.detail.value })
            }
          >
            <IonListHeader>
              <IonLabel>체형</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>표준</IonLabel>
              <IonRadio slot="start" value={1} />
            </IonItem>

            <IonItem>
              <IonLabel>하체 발달</IonLabel>
              <IonRadio slot="start" value={2} />
            </IonItem>

            <IonItem>
              <IonLabel>상체 발달</IonLabel>
              <IonRadio slot="start" value={3} />
            </IonItem>

            <IonItem>
              <IonLabel>선택안함 </IonLabel>
              <IonRadio slot="start" value={0} />
            </IonItem>
          </IonRadioGroup>
        </IonItem> */}
          </IonList>

          <BottomButton>
            <IonButton type="submit" expand="block">
              정보 입력하기
            </IonButton>
          </BottomButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default MemberDetailRegist;
