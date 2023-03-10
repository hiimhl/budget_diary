import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ADD_BUDGET } from "../store";
import { day, setDefaultDate } from "../util/day";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Form = styled.section`
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

  const [isPositive, setIsPositive] = useState(false);

  const navigation = useNavigate();
  const id = uuidv4();

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    if (window.confirm("저장하시겠습니까?")) {
      const date = data.date.slice(0, 10);
      const time = data.date.slice(11);

      // Make amount Positive or Negative
      const amountoNumber = parseInt(data.amount);
      const amount = isPositive ? amountoNumber : -amountoNumber;

      const obj = {
        title: data.title,
        amount,
        date,
        time,
        id,
        category: data.category,
        pay: data.pay,
        memo: data.memo,
      };
      dispatch({ type: ADD_BUDGET, data: obj });
      reset();
      navigation("/");
    }
  };

  const onIsPositive = () => setIsPositive((prev: boolean) => !prev);
  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigation("/");
    }
  };
  return (
    <Form>
      <div>
        <span>{isPositive ? "지출" : "입금"}</span>
        <button onClick={onIsPositive} disabled={isPositive ? false : true}>
          입금
        </button>
        <button onClick={onIsPositive} disabled={isPositive ? true : false}>
          지출
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <label htmlFor="date">지출일 : </label>
            <input
              {...register("date", { required: "날짜를 입력해주세요!" })}
              id="date"
              type="datetime-local"
              defaultValue={setDefaultDate}
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
            <select
              {...register("pay", { required: true })}
              name="pay"
              id="pay"
            >
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
        <button onClick={onCancel}>취소</button>
      </form>
    </Form>
  );
}

export default CreateAmount;
