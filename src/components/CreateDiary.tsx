import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DIARY } from "../store";
import { setDefaultDate } from "../util/day";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormCard, VerticalLine } from "./CreateAmount";

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

  const id = uuidv4();
  const navigation = useNavigate();

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    if (window.confirm("저장하시겠습니까?")) {
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
      dispatch({ type: ADD_DIARY, data: obj });
      reset();
      navigation("/");
    }
  };

  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigation("/");
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
              {...register("date", { required: "날짜를 입력해주세요!" })}
              id="date"
              type="datetime-local"
              defaultValue={setDefaultDate}
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
