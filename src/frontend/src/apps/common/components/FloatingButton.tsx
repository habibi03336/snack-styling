import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import routeContextAtom from "../state/routeContext";
import tabbarAtom from "../state/tabbar";

interface IFloatingButton {
  type?: "plus";
  routeTo?: string;
}

const FloatingButton = ({ type, routeTo }: IFloatingButton) => {
  const tabbarState = useRecoilValue(tabbarAtom);
  const setRouteContextState = useSetRecoilState(routeContextAtom);
  return (
    <IonFab
      vertical="bottom"
      horizontal="end"
      style={{ position: "fixed", display: tabbarState ? "flex" : "none" }}
      slot="fixed"
    >
      <IonFabButton
        onClick={() => {
          if (routeTo === undefined) return;
          setRouteContextState((state) => [...state, routeTo]);
        }}
        routerLink={routeTo}
      >
        <IonIcon
          icon={type === "plus" || type === undefined ? addOutline : ""}
          style={{ position: "absolute" }}
        />
      </IonFabButton>
    </IonFab>
  );
};

export default FloatingButton;
