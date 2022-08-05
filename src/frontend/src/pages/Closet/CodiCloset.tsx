import { useRecoilState } from "recoil";
import CodiCard from "../../components/closet/CodiCard";
import FloatingButton from "../../components/common/FloatingButton";
import useCodis from "../../hooks/useCodis";
import page from "../../recoil/page";

const CodiCloset = () => {
  const [pageState, setPageState] = useRecoilState(page);
  const { codis } = useCodis();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {
        //render codi cards
        codis.map((codi) => {
          return (
            <CodiCard
              key={codi.id}
              codi={codi}
              onCodiClick={() => console.log("codi clicked")}
            />
          );
        })
      }
      <FloatingButton
        onButtonClick={() => {
          setPageState({ ...pageState, pageType: "codiShowCase" });
        }}
      />
    </div>
  );
};

export default CodiCloset;
