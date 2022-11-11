import { IonRouterLink } from "@ionic/react";
import { useSetRecoilState } from "recoil";
import routeContextAtom from "../state/routeContext";

interface IRoutingButton {
  onClick?: () => void;
  routerLink: string;
  children?: JSX.Element;
}
const RoutingLink = ({ onClick, routerLink, children }: IRoutingButton) => {
  const setRouteContextState = useSetRecoilState(routeContextAtom);
  return (
    <IonRouterLink
      onClick={() => {
        if (onClick) {
          onClick();
        }
        setRouteContextState((state) => [...state, routerLink]);
      }}
      routerLink={routerLink}
    >
      {children}
    </IonRouterLink>
  );
};

export default RoutingLink;
