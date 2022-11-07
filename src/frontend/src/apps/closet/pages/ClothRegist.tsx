import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonPage,
  IonSpinner,
} from "@ionic/react";

import TagChip from "../../common/components/TagChip";
import Header from "../../common/components/Header";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import useTags from "../../common/hooks/useTags";
import useClothRegist from "../hooks/useClothRegist";
import BottomButton from "../../common/components/BottomButton";
import { useState } from "react";
import RowFiller from "../../common/components/RowFiller";

const ClothRegist: React.FC = () => {
  const { processClothes, setProcessClothes, updateClothesInfo } =
    useClothRegist();
  const [isEnd, setIsEnd] = useState(false);
  const { tags } = useTags();

  return (
    <IonPage>
      <Header refreshButton={false} />
      <IonContent>
        <Swiper onReachEnd={() => setIsEnd(true)}>
          {processClothes.map((cloth, idx) => {
            const categoryChips = Object.keys(tags).map((tagName) => {
              if (tags[tagName].categoryId !== 100) return;
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

            // make tag chips for every single clothes
            const tagChips = Object.keys(tags).map((tagName) => {
              if (tags[tagName].categoryId !== 1) return;
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
              <SwiperSlide
                key={cloth.tempId}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <IonCard
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    height: "420px",
                  }}
                >
                  {cloth.imageUpdated && (
                    <img
                      style={{ width: "100%" }}
                      src={
                        cloth.imageUpdated
                          ? cloth.imgSrc
                          : "https://media0.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif?cid=ecf05e47jwv4ukfso9coyh4psv1qqjkfws9fn9prw6gi5qz7&rid=giphy.gif&ct=g"
                      }
                    />
                  )}
                  {!cloth.imageUpdated && (
                    <IonSpinner
                      style={{ height: "100%", alignSelf: "center" }}
                      color="dark"
                    />
                  )}
                </IonCard>
                {processClothes.every(
                  (cloth) => cloth.imageUpdated === true
                ) && (
                  <>
                    <div>{categoryChips}</div>
                    <RowFiller px={10} />
                    <div>{tagChips}</div>
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <BottomButton>
          {isEnd && (
            <IonButton
              expand="full"
              onClick={() => {
                updateClothesInfo.subscribe({
                  // next(){},
                  // error(){},
                  complete() {
                    window.location.href = "/closet/cloth";
                  },
                });
              }}
            >
              옷장 등록하기
            </IonButton>
          )}
          {!isEnd && (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
              }}
            >
              {" "}
              오른쪽으로 넘겨주세요!{" "}
            </div>
          )}
        </BottomButton>
      </IonContent>
    </IonPage>
  );
};

export default ClothRegist;
