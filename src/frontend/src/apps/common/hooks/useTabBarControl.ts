import useOnMount from "./useOnMount";

const useTabBarControl = (type?: "useUnmount") => {
  useOnMount(() => {
    const tabbar = document.querySelector("ion-tab-bar");
    const fabButton = document.querySelector("ion-fab");
    if (tabbar !== null) tabbar.style.display = "none";
    if (fabButton !== null) fabButton.style.display = "none";

    if (type === "useUnmount") {
      return () => {
        if (tabbar !== null) tabbar.style.display = "flex";
        if (fabButton !== null) fabButton.style.display = "flex";
      };
    }
  });
};

export default useTabBarControl;
