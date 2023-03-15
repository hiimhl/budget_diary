import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import CreateAmount from "../components/CreateAmount";
import Header from "../components/Header";
import { IData, IState, REMOVE_BUDGET } from "../store";
import { Wrapper } from "./Home";

// Interface
interface IAdd {
  date: string | undefined;
  type?: string | undefined;
  data: object | undefined;
}

function Detail() {
  const { date } = useParams();
  const navigation = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  // Get data
  const data = useSelector((state: IState) => state.data);
  const diary = data.diary[date!];
  const budgetBook = data.budgetBook[date!];
  const schedule = data.schedule[date!];

  const pageDate: IAdd = {
    date,
    data: budgetBook,
  };

  // Go to New or Edit page
  const onAdd = () => navigation("/new", { state: date });
  const onEdit = (data: IData) => navigation("/new", { state: data });
  const onRemove = (data: IData) => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch({ type: REMOVE_BUDGET, data });
    }
  };

  return (
    <Wrapper>
      <Header />
      <h1>{date}일 오늘의 기록</h1>
      <div>
        <h3>할일 목록</h3>
        <br />
        <br />
        <h3>가계부</h3>
        <ul>
          {budgetBook &&
            budgetBook.map((list) => (
              <li key={list.id}>
                {list.title}
                <button onClick={() => onEdit(list)}>수정</button>
                <button onClick={() => onRemove(list)}>삭제</button>
              </li>
            ))}
          <br />
          <br />
          <br />
          {/* <li>저거</li>
          <h3>가계부</h3>
          <span>지출 | 입금</span>
          <ul>
            <li>과자 1200원</li>
          </ul> */}
        </ul>
        {/* <button onClick={onAdd}>추가하기</button> */}
        {/* <button onClick={onEdit}>수정</button> */}
        {isEdit ? <CreateAmount /> : ""}
      </div>
    </Wrapper>
  );
}

export default Detail;
