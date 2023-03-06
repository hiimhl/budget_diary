import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DIARY } from "../store";

const Form = styled.form`
  li {
    margin: 10px 0;
    padding: 10px 20px;
    background-color: pink;
    display: grid;
    grid-template-columns: 40% 60%;
  }
`;

// Interface
interface IForm {
  date: string;
  title: string;
  memo: string;
  emoji: string;
}

function CreateDiary() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const dispatch = useDispatch();

  // Create random id
  const randomId = () => {
    return Math.floor(Math.random() * 10);
  };
  const id = randomId();
  const storeDiary = useSelector((state: any) => state.data.diary);

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    const date = data.date.slice(0, 10);
    const dash = data.date.replace(":", "-");
    const fullDate = dash.replace("T", "-");
    const time = data.date.slice(11);
    const obj = {
      title: data.title,
      date,
      time,
      id: fullDate + "-" + id,
      emoji: data.emoji,
      memo: data.memo,
    };
    dispatch({ type: ADD_DIARY, data: obj });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        <li>
          <label htmlFor="date">날짜 : </label>
          <input
            {...register("date", { required: "날짜를 입력해주세요!" })}
            id="date"
            type="datetime-local"
          />
          <p>{errors?.date?.message}</p>
        </li>
        <li>
          <label htmlFor="title">메모 : </label>
          <input
            {...register("title", {
              required: "내역을 입력해주세요!",
              minLength: {
                value: 2,
                message: "2글자 이상 입력해주세요.",
              },
            })}
            type="text"
            id="title"
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
      <input type="submit" value="확인" />
      <button>취소</button>
    </Form>
  );
}

export default CreateDiary;
