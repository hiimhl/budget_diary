import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ADD_DIARY, EDIT_DIARY, REMOVE_DIARY } from "../store/actions-type";
import { setDefaultDate } from "../util/day";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormCard, MyInput, VerticalLine } from "./CreateAmount";

import styled from "styled-components";
import { borderRadius, font, fontSize, fontWeight, space } from "../style-root";
import { emojis, imageUrl } from "../util/image";

// Style
const EmojiBox = styled.li`
  span {
    font-weight: ${fontWeight.small};
  }
  /* Emojis */
  div {
    margin: ${space.small} 0;
    display: flex;
    justify-content: space-between;
    /* Input List */

    input {
      display: none;
    }
    input[type="radio"]:checked + label {
      background-color: ${(props) => props.theme.pointColor};
      img {
        filter: invert(100%) sepia(66%) saturate(522%) hue-rotate(200deg)
          brightness(116%) contrast(100%);
      }
    }
    label {
      cursor: pointer;
      font-size: ${fontSize.title};
      /* margin-right: ${space.middle}; */
      padding: ${space.micro};
      border-radius: ${borderRadius.small};
      border: 2px solid ${(props) => props.theme.pointColor};
    }
    /* emoji */
    img {
      width: 40px;
    }
  }
`;

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
    // set default value
    setValue("emoji", "emoji_1");

    if (editData) {
      setIsEdit(true);
      setValue("date", editData.time);
      setValue("title", editData.title);
      setValue("emoji", editData.emoji);
      setValue("memo", editData.memo);
    }
  }, []);

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    const date = data.date.slice(0, 10);

    const obj = {
      title: data.title,
      date,
      time: data.date,
      id,
      type: "diary",
      emoji: data.emoji,
      memo: data.memo,
      endDate: data.date,
    };

    if (editData && date != editData.date) {
      return (
        dispatch({ type: REMOVE_DIARY, data: editData }),
        dispatch({ type: ADD_DIARY, data: obj }),
        navigation("/")
      );
    }

    dispatch({ type: isEdit ? EDIT_DIARY : ADD_DIARY, data: obj });
    reset();

    isEdit ? navigation(`/${editData.date}`) : navigation("/");
    setIsEdit(false);
  };

  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      isEdit ? navigation(`/${editData.date}`) : navigation("/");
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
          <EmojiBox>
            <span>이모티콘 : </span>
            <div>
              {emojis.map((emoji) => (
                <div key={emoji}>
                  <input
                    {...register("emoji")}
                    value={emoji}
                    id={emoji}
                    type="radio"
                  />
                  <label htmlFor={emoji}>
                    <img src={`${imageUrl}${emoji}.svg`} alt="emoji" />
                  </label>
                </div>
              ))}
            </div>
          </EmojiBox>
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
