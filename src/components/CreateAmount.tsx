import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ADD_BUDGET } from "../store";

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
  amount: string;
  title: string;
  category: string;
  pay: string;
  memo: string;
}

function CreateAmount() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const dispatch = useDispatch();

  const onSubmit = (data: IForm) => {
    const date = data.date.slice(0, 10);
    const time = data.date.slice(11);
    const obj = {
      time: time,
      title: data.title,
      amount: data.amount,
      id: date,
      category: data.category,
      pay: data.pay,
      memo: data.memo,
    };
    dispatch({ type: ADD_BUDGET, data: obj });
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        <li>
          <label htmlFor="date">지출일 : </label>
          <input
            {...register("date", { required: "날짜를 입력해주세요!" })}
            id="date"
            type="datetime-local"
          />
          <p>{errors?.date?.message}</p>
        </li>
        <li>
          <label htmlFor="title">내역 : </label>
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
          <label htmlFor="amount">금액 : </label>
          <input
            {...register("amount", {
              required: "금액을 입력해주세요!",
              minLength: {
                value: 2,
                message: "2글자 이상 입력해주세요.",
              },
            })}
            type="number"
            id="amount"
          />
          <p>{errors?.amount?.message}</p>
        </li>
        <li>
          <label htmlFor="category">카테고리 : </label>
          <select {...register("category", { required: true })} id="category">
            <option value="eat">식비</option>
            <option value="health">건강유지비</option>
            <option value="study">교육비</option>
          </select>
        </li>
        <li>
          <label htmlFor="pay">지불 수단 : </label>
          <select {...register("pay", { required: true })} name="pay" id="pay">
            <option value="credit">신용카드</option>
            <option value="cash">현금</option>
          </select>
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

export default CreateAmount;
