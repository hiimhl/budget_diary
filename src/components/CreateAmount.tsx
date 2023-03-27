import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ADD_BUDGET, EDIT_BUDGET } from "../store";
import { day, setDefaultDate } from "../util/day";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  borderRadius,
  boxShadow,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../style-root";

// Style
export const FormCard = styled.section`
  background-color: ${(props) => props.theme.weekColor.week_2};
  width: 90%;
  margin: auto;
  box-shadow: ${boxShadow.small};
  border-radius: ${borderRadius.small};
  padding: ${space.middle};
  font-family: ${font.kor};

  h2 {
    font-size: ${fontSize.large};
    font-family: ${font.kor};
    font-weight: ${fontWeight.title};
    margin-bottom: ${space.middle};
  }

  form {
    /* Vertical Line is based on the Form */
    position: relative;
    background-color: ${(props) => props.theme.cardColor};
    border-radius: ${borderRadius.small};
    height: 70vh;
  }

  /* Input List */
  li {
    align-items: center;
    padding: ${space.basic} ${space.large};
    border-bottom: 1px solid ${colorSet.lightGray};
    display: grid;
    grid-template-columns: 40% 60%;
  }

  li:first-child {
    border-bottom: 1px solid black;
  }
  li:last-child {
    border: none;
  }

  input,
  select {
    border-radius: ${borderRadius.micro};
    border: 2px solid ${colorSet.lightGray};
    padding: ${space.micro};
  }

  option {
  }

  label {
    /* font-size: ${fontSize.large}; */
    font-weight: ${fontWeight.small};
  }

  textarea {
    border-radius: ${borderRadius.micro};
    border: 2px solid ${colorSet.lightGray};
    padding: ${space.micro};
    height: 100px;
  }

  /* Error Message */
  p {
    grid-column: 2/3;
    color: ${colorSet.red};
    font-weight: ${fontWeight.small};
    line-height: 1.6;
  }

  /* Submit and Cancel button */
  .submit_box {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: ${space.large};
    height: 50px;
    align-items: center;
    margin-bottom: ${space.small};

    button {
      cursor: pointer;
      padding: 0 ${space.micro};
      font-weight: ${fontWeight.title};
      height: 35px;
      width: 80px;
      margin-left: ${space.small};
      border-radius: ${borderRadius.micro};
      transition: color 0.4s ease, background-color 0.3s ease;
    }
    .submit {
      background-color: ${(props) => props.theme.pointColor};
      color: white;
    }
    .cancel {
      color: ${colorSet.gray};
      border: 2px solid ${colorSet.lightGray};
    }
    .cancel:hover {
      border: 2px solid ${colorSet.red};
      background-color: ${colorSet.red};
      border: none;
      color: white;
    }
  }
`;

export const VerticalLine = styled.div`
  position: absolute;
  width: 30%;
  height: 100%;
  top: 0;
  left: 0;
  border-right: 2px ${(props) => props.theme.pointColor} dashed;
`;

export const MyInput = styled.input`
  /* Error or 입력시 강조 */
  &:focus {
    outline: none;
    border-color: ${(props: IIsvalid) =>
      props.isValid ? "black" : colorSet.red};
  }
`;

const SelectPositive = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${space.middle};
  button {
    margin-right: ${space.middle};
    padding: 0;
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.title};
    color: ${colorSet.gray};
    font-family: ${font.kor};
  }
  button:disabled {
    color: black;
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

export type IIsvalid = {
  isValid?: boolean | undefined;
};

// Component
function CreateAmount() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<IForm>();
  const dispatch = useDispatch();

  const [isPositive, setIsPositive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigation = useNavigate();
  const id = uuidv4();

  // Set the value of the form - Edit page
  const location = useLocation();
  const editData = location.state;

  useEffect(() => {
    if (editData) {
      setIsEdit(true);
      setValue("date", editData.time);
      setValue("amount", editData.amount);
      setValue("title", editData.title);
      setValue("category", editData.category);
      setValue("pay", editData.pay);
      setValue("memo", editData.memo);
    }
  }, []);

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    const date = data.date.slice(0, 10);

    // Make amount Positive or Negative
    const amountToNumber = parseInt(data.amount);
    const amount = isPositive ? amountToNumber : -amountToNumber;

    const obj = {
      title: data.title,
      amount,
      date,
      time: data.date,
      id: isEdit ? editData.id : id,
      category: data.category,
      pay: data.pay,
      memo: data.memo,
    };

    dispatch({ type: isEdit ? EDIT_BUDGET : ADD_BUDGET, data: obj });
    reset();

    // navigate
    isEdit ? navigation(`/${editData.date}`) : navigation("/");
    setIsEdit(false);
  };

  // Set positive or negative
  const onIsPositive = () => setIsPositive((prev: boolean) => !prev);

  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      isEdit ? navigation(`/${editData.date}`) : navigation("/");
    }
  };

  return (
    <FormCard>
      <SelectPositive>
        <button onClick={onIsPositive} disabled={isPositive ? false : true}>
          지출
        </button>
        <button onClick={onIsPositive} disabled={isPositive ? true : false}>
          입금
        </button>
      </SelectPositive>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>
            <label htmlFor="date">{isPositive ? "입금일" : "지출일"} </label>
            <MyInput
              {...register("date", { required: "날짜를 입력해주세요!" })}
              id="date"
              type="datetime-local"
              defaultValue={setDefaultDate}
            />
          </li>
          <li>
            <label htmlFor="title">내역 </label>
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
            <label htmlFor="amount">금액 </label>
            <MyInput
              {...register("amount", {
                required: "금액을 입력해주세요!",
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력해주세요.",
                },
              })}
              isValid={isValid}
              type="number"
              id="amount"
            />
            <p>{errors?.amount?.message}</p>
          </li>
          <li>
            <label htmlFor="category">카테고리 </label>
            <select {...register("category", { required: true })} id="category">
              <option value="eat">식비</option>
              <option value="health">건강유지비</option>
              <option value="study">교육비</option>
            </select>
          </li>
          <li>
            <label htmlFor="pay">지불 수단 </label>
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
            <label className="memo" htmlFor="memo">
              메모
            </label>
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

export default CreateAmount;
