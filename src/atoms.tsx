import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const { persistAtom } = recoilPersist({
  key: "toDo",
  storage: localStorage,
});

export const categoryListState = atom<string[]>({
  key: "categoryList",
  default: [Categories.TO_DO, Categories.DOING, Categories.DONE],
  effects: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO,
  effects: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
