import { IonButton, IonContent, IonPage } from "@ionic/react";
import ClothCard from "../components/closet/ClothCard";
import Header from "../components/common/Header";

import useClothes from "../hooks/useClothes";
import useCodiRegist from "../hooks/useCodiRegist";
import CodiBoard from "../components/common/CodiBoard";
import useTags from "../hooks/useTags";
import { useRecoilState } from "recoil";
import page from "../recoil/page";

const CodiShowCase: React.FC = () => {
  const { clothes } = useClothes();
  const [pageState, setPageState] = useRecoilState(page);
  const { selectTag, clearSelection, selectedTags } = useTags();
  const { codiTemplate, putCodiCloth, boardConfig, uploadCodi } =
    useCodiRegist();

  const onClickCodiSave = () => {
    uploadCodi.subscribe({
      complete() {
        setPageState({ ...pageState, pageType: "main" });
      },
    });
  };

  const onBoardImgClick = (category: string) => {
    clearSelection();
    selectTag(category);
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <CodiBoard
          boardConfig={boardConfig}
          codiClothes={codiTemplate.clothes}
          onBoardImgClick={onBoardImgClick}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {
            // render cloth cards filterd by selected category.
            clothes.map((cloth) => {
              if (cloth.category !== selectedTags[0]) return "";
              return (
                <ClothCard
                  key={cloth.id}
                  cloth={cloth}
                  onCardClick={() => {
                    putCodiCloth(cloth);
                  }}
                />
              );
            })
          }
        </div>
        <IonButton onClick={onClickCodiSave} expand="block">
          답변등록
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
//상의 5번, 하의 6번
export default CodiShowCase;
