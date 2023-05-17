import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  ADD_SCHEDULE,
  EDIT_SCHEDULE,
  REMOVE_SCHEDULE,
} from "../store/actions-type";
import { day } from "../util/day";
import { useLocation, useNavigate } from "react-router-dom";
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
    watch,
    formState: { errors, isValid },
  } = useForm<IForm>();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const newId = uuidv4();
  const navigation = useNavigate();

  // DefaultValue of Date input - fiexd at 9AM today
  const todayNineAM = day.format("YYYY-MM-DDT09:00");
  const firstDate = watch("date");

  // Save the data received by Navigation Button
  const location = useLocation();
  const editData = location.state;

  // 마지막날의 기본 값을 사용자가 입력한 첫날로 설정
  useEffect(() => {
    if (!isEdit) {
      setValue("endDate", firstDate);
    }
  }, [firstDate]);

  // 수정할 데이터를 Form안에 넣음
  useEffect(() => {
    if (editData) {
      setIsEdit(true);
      setValue("date", editData.time);
      setValue("endDate", editData.endDate);
      setValue("title", editData.title);
      setValue("memo", editData.memo);
    }
  }, []);

  // Send data to the Store
  const onSubmit = (data: IForm) => {
    if (window.confirm("저장하시겠습니까?")) {
      const date = data.date.slice(0, 10);
      const obj = {
        title: data.title,
        date,
        time: data.date,
        type: "schedule",
        endDate: data.endDate,
        id: isEdit ? editData.id : newId,
        memo: data.memo,
      };
      // 수정할 데이터의 날짜를 모두 수정한다면
      if (isEdit && editData.date != date) {
        dispatch({ type: REMOVE_SCHEDULE, data: editData });
        dispatch({ type: ADD_SCHEDULE, data: obj });
        setIsEdit(false);
        navigation(`/${date}`);
        return;
      }
      dispatch({ type: isEdit ? EDIT_SCHEDULE : ADD_SCHEDULE, data: obj });
      reset();

      isEdit ? navigation(`/${editData.date}`) : navigation("/");
      setIsEdit(false);
    }
  };

  const onCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      isEdit ? navigation(`/${editData.date}`) : navigation("/");
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
