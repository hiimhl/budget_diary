import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DIARY, ADD_SCHEDULE } from "../store";
import { day } from "../util/day";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormCard, MyInput, VerticalLine } from "./CreateAmount";

// Interface
interface IForm {
  date: string;
  title: string;
  memo: string;
  endDate: string;
}

function CreateSchedule() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>();
  const dispatch = useDispatch();
  console.log(isValid);
  const id = uuidv4();
  const navigation = useNavigate();

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    if (window.confirm("저장하시겠습니까?")) {
      const date = data.date.slice(0, 10);
      const obj = {
        title: data.title,
        date,
        startDate: data.date,
        endDate: data.endDate,
        id,
        memo: data.memo,
      };
      dispatch({ type: ADD_SCHEDULE, data: obj });
      reset();
      navigation("/");
    }
  };
  const todayNineAM = day.format("YYYY-MM-DDT09:00");

  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigation("/");
    }
  };

  return (
    <FormCard onSubmit={handleSubmit(onSubmit)}>
      <h2>오늘의 할일</h2>
      <form>
        <ul>
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
            <label htmlFor="date">시작일 : </label>
            <input
              {...register("date", { required: "날짜를 입력해주세요!" })}
              id="date"
              type="datetime-local"
              defaultValue={todayNineAM}
            />
          </li>
          <li>
            <label htmlFor="endDate">종료일 : </label>
            <input
              {...register("endDate", { required: "날짜를 입력해주세요!" })}
              id="endDate"
              type="datetime-local"
              defaultValue={todayNineAM}
            />
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

export default CreateSchedule;
