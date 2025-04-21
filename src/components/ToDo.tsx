import { MouseEvent } from "react";
import { categoryListState, IToDo, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ToDo = ({ text, category: choiceCategory, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryListState);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldTodos.slice(0, targetIndex),
        newToDo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categoryList.map(
        (category: string) =>
          category !== choiceCategory && (
            <button key={category} name={category} onClick={onClick}>
              {category}
            </button>
          )
      )}
      <button
        onClick={() => {
          setToDos((oldTodos) => oldTodos.filter((toDo) => toDo.id !== id));
        }}
        style={{
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default ToDo;
