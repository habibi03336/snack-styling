import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonPage,
} from "@ionic/react";

import TagChip from "../components/common/TagChip";
import Header from "../components/common/Header";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import useTags from "../hooks/useTags";
import useClothRegist from "../hooks/useClothRegist";
import { useRecoilState } from "recoil";
import page from "../recoil/page";

const ClothRegist: React.FC = () => {
  const [pageState, setPageState] = useRecoilState(page);
  const { processClothes, setProcessClothes, updateClothesInfo } =
    useClothRegist();
  const { tags } = useTags();

  return (
    <IonPage>
      <Header />
      <IonContent>
        <Swiper>
          {processClothes.map((cloth, idx) => {
            // make tag chips for every single clothes
            const tagChips = Object.keys(tags).map((tagName) => {
              const tagId = tags[tagName].id;

              return (
                <TagChip
                  key={tagName}
                  tagName={tagName}
                  onTagClick={() => {
                    const newTags = [...cloth.tags];
                    const tagIndex = newTags.findIndex(
                      (item) => item === tagId
                    );
                    if (tagIndex !== -1) newTags.splice(tagIndex, 1);
                    else newTags.push(tagId);

                    const newProcessClothes = [...processClothes];
                    newProcessClothes[idx] = {
                      ...newProcessClothes[idx],
                      tags: newTags,
                    };

                    setProcessClothes(newProcessClothes);
                  }}
                  isSelected={cloth.tags.includes(tagId)}
                />
              );
            });

            // make cloth swiper with tags
            return (
              <SwiperSlide key={cloth.tempId}>
                <IonCard>
                  <IonCardHeader>
                    <img
                      src={
                        cloth.imageUpdated
                          ? cloth.imgSrc
                          : "https://media0.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif?cid=ecf05e47jwv4ukfso9coyh4psv1qqjkfws9fn9prw6gi5qz7&rid=giphy.gif&ct=g"
                      }
                    />
                  </IonCardHeader>
                  <IonCardContent>{tagChips}</IonCardContent>
                </IonCard>
              </SwiperSlide>
            );
          })}

          <SwiperSlide key="this is regist button slide">
            <IonButton
              onClick={() => {
                updateClothesInfo.subscribe({
                  // next(){},
                  // error(){},
                  complete() {
                    setPageState({ ...pageState, pageType: "main" });
                  },
                });
              }}
            >
              옷장 등록하기
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default ClothRegist;
