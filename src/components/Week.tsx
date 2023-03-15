// Weekly Calendar
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IState } from "../store";
import { borderRadius, boxShadow, font, fontSize, space } from "../style-root";
import { day, getWeek, getWeekList, today } from "../util/day";

const WeekWrapper = styled.div<{ userTheme: string }>`
  width: 85%;
  margin: 40px auto;
  padding: 20px;
  h2 {
    font-family: ${font.eng};
    font-size: ${fontSize.large};
  }
  ul {
    width: 95%;
    margin: auto;
    li {
      cursor: pointer;
      display: grid;
      grid-template-columns: 10% 10% 80%;
      margin: ${space.small} 0;
      padding: 13px ${space.middle};
      border-radius: ${borderRadius.small};
      box-shadow: ${boxShadow.small};
    }
    .today {
      padding-bottom: ${space.xlarge};
      border: 2px solid ${(props) => props.theme.pointColor};
      /* font-weight: 500; */
    }
  }
  .week_0 {
    background-color: ${(props) => props.theme.weekColor.week_0};
  }
  .week_1 {
    background-color: ${(props) => props.theme.weekColor.week_1};
  }
  .week_2 {
    background-color: ${(props) => props.theme.weekColor.week_2};
  }
  .week_3 {
    background-color: ${(props) => props.theme.weekColor.week_3};
  }
  .week_4 {
    background-color: ${(props) => props.theme.weekColor.week_4};
  }
  .week_5 {
    background-color: ${(props) => props.theme.weekColor.week_5};
  }
  .week_6 {
    background-color: ${(props) => props.theme.weekColor.week_6};
  }
`;

function Week() {
  const [weekData, setWeekData] = useState(day);
  const [dayList, setDayList] = useState(getWeekList(weekData));

  const budgetData = useSelector((state: IState) => state.data.budgetBook);
  const diaryData = useSelector((state: IState) => state.data.diary);

  const navigation = useNavigate();

  // console.log(Object.keys(budgetData));
  const theme = "rainbow";

  // Get Next and Previous weeks
  const onNextWeeks = () => {
    setWeekData((prev: Dayjs) => prev.add(7, "day"));
    // setDayList(getWeekList(weekData));
    setDayList(getWeekList(weekData.add(7, "day"))); // 값을 바로 반영하기 위해 변경된 값을 전달
  };
  const onPrevWeeks = () => {
    setWeekData((prev: Dayjs) => prev.subtract(7, "day"));
    setDayList(getWeekList(weekData.subtract(7, "day")));
  };

  return (
    <WeekWrapper userTheme={theme}>
      <h2>Week</h2>
      <span>❤</span>
      <div>
        <button onClick={onPrevWeeks}>prev</button>
        <span>{weekData.format("MM")}월</span>
        <button onClick={onNextWeeks}>next</button>
      </div>
      <ul>
        {dayList.map((list, index) => {
          let total = 0;

          if (budgetData[list]) {
            total = budgetData[list].reduce((prev, current) => {
              return prev + current.amount!;
            }, 0);
          }
          let isToday = "";
          if (list === today) {
            isToday = "today";
          }

          const day = getWeek(index);
          return (
            <li
              onClick={() => navigation(`/detail/${list}`)}
              key={`week_${index}`}
              className={`week_${index} ${isToday}`}
            >
              <b>{day}</b>
              <span>{list.slice(-2)}일</span>
              <div>
                {total === 0 ? "" : <span>{total}원 </span>}
                <span>아이콘</span>
              </div>
            </li>
          );
        })}
      </ul>
    </WeekWrapper>
  );
}

export default Week;
