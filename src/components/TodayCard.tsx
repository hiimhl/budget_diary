import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "../store";
import { useNavigate } from "react-router-dom";
import { dayOfWeek, today } from "../util/day";
import { borderRadius } from "../style-root";

// Style
const Card = styled.div`
  background-color: ${(props) => props.theme.weekColor.week_2};
  padding: 15px;
  height: 250px;
  width: 75%;
  margin: auto;
  border-radius: ${borderRadius.large};
`;

const Content = styled.div`
  cursor: pointer;
  height: 90%;
`;

// Component
function TodayCard() {
  const data = useSelector((state: IState) => state.data);
  const navigation = useNavigate();

  let todayBudget = data.budgetBook[today];
  const todayDiary = data.diary[today];
  const todaySchdule = data.schedule[today];

  // Set today's total amount
  let totalAmount = 0;
  if (todayBudget && todayBudget.length > 1) {
    totalAmount = todayBudget.reduce((prev: any, current: any) => {
      return prev + current.amount;
    }, 0);
  } else if (todayBudget && todayBudget.length === 1) {
    totalAmount = todayBudget[0].amount!;
  }

  // Go to Detail page
  const onToDetail = () => navigation(`/detail/${today}`);
  const onCreate = () => navigation("/new");

  return (
    <Card>
      <h2>
        {today.slice(-2)}일 {dayOfWeek}
      </h2>
      {todayBudget || todayDiary || todaySchdule ? (
        <Content onClick={onToDetail}>
          <div>
            <span>총 지출 : {totalAmount}원</span>
            {todayDiary && (
              <>
                <p>{todayDiary.title}</p>
                <div>{todayDiary.emoji}</div>
              </>
            )}
          </div>
          {todayDiary && <div>쪽지</div>}
          <ul>
            할일 :
            {todaySchdule &&
              todaySchdule.map((data) => <li key={data.id}>{data.title}</li>)}
          </ul>
        </Content>
      ) : (
        <>
          <span>일정을 추가해주세요</span>
          <button onClick={onCreate}>추가하기</button>
        </>
      )}
    </Card>
  );
}

export default TodayCard;
