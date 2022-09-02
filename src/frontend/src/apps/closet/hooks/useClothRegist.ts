import { POST_CLOTHS, PATCH_CLOTHS } from "../../../lib/api/cloth";
import { useRecoilState } from "recoil";
import { processClothesState, IProcessClothes } from "../state/processCloth";
import { Observable } from "rxjs";
import user from "../../common/state/user";

const useClothRegist = () => {
  const [userState, _] = useRecoilState(user);
  const [processClothes, setProcessClothes] =
    useRecoilState(processClothesState);

  const uploadClothes = (files: FileList | null) => {
    if (!files) return;

    const newProcessRegist: IProcessClothes[] = [];
    for (let i = 0; i < files.length; i++) {
      newProcessRegist.push({
        tempId: files[i].name,
        imageFile: files[i],
        tags: [],
        imageUpdated: false,
      });
    }

    setProcessClothes(newProcessRegist);

    const processRegist = [...newProcessRegist];

    for (let i = 0; i < newProcessRegist.length; i++) {
      const frm = new FormData();
      frm.append("image", newProcessRegist[i].imageFile);
      POST_CLOTHS(userState.id!, frm)
        .then((res) => res.data)
        .then((data) => {
          processRegist[i] = {
            ...processRegist[i],
            id: data.id,
            imageUpdated: true,
            imgSrc: data.image,
          };
          setProcessClothes([...processRegist]);
        });
    }
  };

  const updateClothesInfo = new Observable((subscriber) => {
    (async () => {
      const clothes: { id: number; tags: number[] }[] = [];

      processClothes.forEach((cloth) => {
        if (cloth.id === undefined) return;
        clothes.push({ id: cloth.id, tags: cloth.tags });
      });

      const res = await PATCH_CLOTHS(clothes);

      const data = res.data;
      subscriber.complete();
    })();
  });

  return {
    processClothes,
    setProcessClothes,
    uploadClothes,
    updateClothesInfo,
  };
};

export default useClothRegist;
