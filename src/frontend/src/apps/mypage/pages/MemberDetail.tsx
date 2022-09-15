import {
  IonList,
  IonItemDivider,
  IonItem,
  IonRadioGroup,
  IonListHeader,
  IonLabel,
  IonRadio,
  IonInput,
  IonButton,
  IonContent,
  IonPage,
} from "@ionic/react";
import useMemberRegist from "../hooks/useMemberRegist";
import { useHistory } from "react-router";

const MemberDetailRegist = () => {
  const { features, setFeatures, postSignin } = useMemberRegist();
  return (
    <IonPage>
      <IonContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postSignin.subscribe({
              complete() {
                window.location.href = "/login";
              },
            });
          }}
        >
          <IonList>
            <IonItemDivider>별명</IonItemDivider>
            <IonItem>
              <IonInput
                onIonChange={(e) => {
                  setFeatures({ ...features, nickname: e.detail.value! });
                }}
              />
            </IonItem>
            <IonItemDivider>성별</IonItemDivider>
            <IonItem>
              <IonRadioGroup
                value={features.gender}
                onIonChange={(e) =>
                  setFeatures({ ...features, gender: e.detail.value })
                }
              >
                <IonListHeader>
                  <IonLabel>성별</IonLabel>
                </IonListHeader>

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
              </IonRadioGroup>
            </IonItem>

            <IonItemDivider>나이</IonItemDivider>
            <IonItem>
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
            </IonItem>

            <IonItemDivider>키(cm)</IonItemDivider>
            <IonItem>
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
            </IonItem>
            <IonItemDivider>몸무게(kg)</IonItemDivider>
            <IonItem>
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
            </IonItem>

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
          <IonItemDivider></IonItemDivider>
          <IonButton type="submit" expand="block">
            정보 입력하기
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default MemberDetailRegist;
