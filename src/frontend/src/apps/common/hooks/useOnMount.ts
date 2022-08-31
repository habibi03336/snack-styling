import { useEffect } from "react";

const useOnMount = (effect: () => void) => {
  useEffect(effect, []);
};

export default useOnMount;
