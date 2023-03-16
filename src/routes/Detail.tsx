import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import CreateAmount from "../components/CreateAmount";
import DetailList from "../components/DetailList";
import Header from "../components/Header";
import { IData, IState, REMOVE_BUDGET } from "../store";
import { borderRadius, fontSize, fontWeight, space } from "../style-root";
import { Wrapper } from "./Home";

const Card = styled.div`
  background-color: ${(props) => props.theme.weekColor.week_3};
  padding: ${space.basic};
  margin: ${space.basic};
  width: 90%;
  height: auto;
  border-radius: ${borderRadius.large};

  h3 {
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.small};
  }

  ul {
  }
`;

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
        <Card>
          <h3>할일 목록</h3>
          <ul>
            {schedule &&
              schedule.map((list) => (
                <DetailList key={list.id} data={list} type={"schedule"} />
              ))}
          </ul>
        </Card>
        <Card>
          <h3>가계부</h3>
          <ul>
            {budgetBook &&
              budgetBook.map((list) => (
                <DetailList key={list.id} data={list} type={"budget"} />
              ))}
          </ul>
        </Card>
        <Card>
          <h3>일기</h3>
          {diary && <DetailList data={diary} type={"diary"} />}
        </Card>
      </div>
    </Wrapper>
  );
}

export default Detail;
