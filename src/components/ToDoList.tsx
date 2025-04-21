import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  Categories,
  categoryListState,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import ToDo from "./ToDo";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const setToDos = useSetRecoilState(toDoState);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onInput = (event: FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onValid = ({ category }: IForm) => {
    setCategoryList((prev) => [...prev, category]);
    setCategory(category as string);
    setValue("category", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <div style={{ display: "flex" }}>
        <select value={category} onInput={onInput}>
          {categoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setCategoryList((prev) => prev.filter((item) => item !== category));
            setToDos((prev) =>
              prev.filter((toDo) => toDo.category !== category)
            );
            setCategory(Categories.TO_DO);
          }}
          style={{
            marginRight: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
          }}
        >
          Delete
        </button>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("category", {
              required: "카테고리를 입력해주세요.",
              validate: (value) =>
                !categoryList.includes(value) ||
                "이미 존재하는 카테고리입니다.",
            })}
            type="text"
            placeholder="Add a to do category"
          />
          <button>Add</button>
          {errors.category && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.category.message}
            </span>
          )}
        </form>
      </div>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

export default ToDoList;
