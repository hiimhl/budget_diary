import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ADD_DIARY, EDIT_DIARY } from "../store";
import { setDefaultDate } from "../util/day";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormCard, MyInput, VerticalLine } from "./CreateAmount";

// Interface
interface IForm {
  date: string;
  title: string;
  memo: string;
  emoji: string;
}

// Component
function CreateDiary() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const id = uuidv4();
  const navigation = useNavigate();

  // Set the value of the form - Edit page
  const location = useLocation();
  const editData = location.state;

  useEffect(() => {
    if (editData) {
      setIsEdit(true);
      console.log(editData);
      const dateTime = editData.date + "T" + editData.time;
      setValue("date", dateTime);
      setValue("title", editData.title);
      setValue("emoji", editData.emoji);
      setValue("memo", editData.memo);
    }
  }, []);

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    const date = data.date.slice(0, 10);
    const time = data.date.slice(11);
    const obj = {
      title: data.title,
      date,
      time,
      id,
      emoji: data.emoji,
      memo: data.memo,
    };
    dispatch({ type: isEdit ? EDIT_DIARY : ADD_DIARY, data: obj });
    reset();

    isEdit ? navigation(`/detail/${editData.date}`) : navigation("/");
    setIsEdit(false);
  };

  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      isEdit ? navigation(`/detail/${editData.date}`) : navigation("/");
    }
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2>오늘의 기록</h2>
      <form>
        <ul>
          <li>
            <label htmlFor="date">날짜 : </label>
            <input
              {...register("date", { required: "날짜를 입력해주세요" })}
              id="date"
              type="datetime-local"
              defaultValue={setDefaultDate}
            />
            <p>{errors?.date?.message}</p>
          </li>
          <li>
            <label htmlFor="title">제목 : </label>
            <MyInput
              {...register("title", {
                required: "내역을 입력해주세요!",
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력해주세요.",
                },
              })}
              type="text"
              id="title"
              isValid={isValid}
            />
            <p>{errors?.title?.message}</p>
          </li>
          <li>
            <input
              {...register("emoji")}
              value="emoji_1"
              id="emoji_1"
              type="radio"
            />
            <label htmlFor="emoji_1">image</label>
            <input
              {...register("emoji")}
              value="emoji_2"
              id="emoji_2"
              type="radio"
            />
            <label htmlFor="emoji_2">image</label>
          </li>
          <li>
            <label htmlFor="memo">메모 : </label>
            <textarea {...register("memo")} id="memo" />
          </li>
        </ul>
        <div className="submit_box">
          <button className="submit" type="submit">
            확인
          </button>
          <button className="cancel" onClick={onCancel}>
            취소
          </button>
        </div>
        <VerticalLine />
      </form>
    </FormCard>
  );
}

export default CreateDiary;
