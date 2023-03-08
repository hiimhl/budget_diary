import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IBudget, IState } from "../store";
import { useNavigate } from "react-router-dom";
import { getWeek } from "../util/day";

const Card = styled.div``;

interface IProps {
  today: string;
  day: number;
}

function TodayCard({ today, day }: IProps) {
  const data = useSelector((state: IState) => state.data);
  const navigation = useNavigate();

  const todayBudget = data.budgetBook[today];
  const todayDiary = data.diary[today];

  const totalAmount = todayBudget.reduce((prev: any, current: any) => {
    return prev + current.amount;
  }, 0);

  const dayOfWeek = getWeek(day);
  // console.log(todayTotal);
  // Go to Detail page
  const onToDetail = () => navigation("/Detail");

  return (
    <Card>
      <h2>
        {today.slice(-2)}일 {dayOfWeek}
      </h2>
      {todayBudget || todayDiary ? (
        <>
          <div>
            <span>총 지출 : {totalAmount ? totalAmount.slice(1) : "0"}원</span>
            {todayDiary ? (
              <>
                <p>{todayDiary.title}</p>
                <div>{todayDiary.emoji}</div>
              </>
            ) : (
              <div>기록 추가하기</div>
            )}
          </div>
          {todayDiary && <div>쪽지</div>}
          <button onClick={onToDetail}>추가하기</button>
        </>
      ) : (
        <span>일정을 추가해주세요</span>
      )}
    </Card>
  );
}

export default TodayCard;
