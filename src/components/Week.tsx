// Weekly Calendar
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IState } from "../store";
import {
  borderRadius,
  boxShadow,
  colorSet,
  font,
  fontSize,
  fontWeight,
  space,
} from "../style-root";
import { day, getWeek, getWeekList, today } from "../util/day";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Style
const WeekWrapper = styled.div`
  width: 85%;
  margin: 40px auto;
  padding: 20px;

  ul {
    width: 95%;
    margin: auto;
  }
`;

const Box = styled.div`
  position: relative;
  text-align: center;

  h2 {
    position: absolute;
    left: 0;
    font-family: ${font.eng};
    font-size: ${fontSize.week};
  }

  /* Month and previous, next button */
  div {
    display: inline-block;
    font-size: ${fontSize.large};
    span {
      margin: 0 15px;
      font-weight: ${fontWeight.small};
    }
    button {
      font-size: ${fontSize.large};
      color: ${colorSet.darkGray};
    }
  }
`;

const MyList = styled.li`
  align-items: center;
  font-size: ${fontSize.small};
  cursor: pointer;
  display: grid;
  grid-template-columns: 10% 15% 75%;
  margin: ${space.small} 0;
  padding: 13px ${space.middle};
  border-radius: ${borderRadius.small};
  box-shadow: ${boxShadow.small};
  /* color: ${colorSet.darkGray}; */

  /* day of the week */
  b {
    font-family: ${font.monospace};
    font-weight: ${fontWeight.small};
    letter-spacing: 0.5px;
    font-size: ${fontSize.basic};
    /* font-family: ${font.eng}; */
  }
  /* day */
  small {
    font-size: ${fontSize.micro};
  }

  /* Today */
  &.today {
    border-top: 4px solid ${(props) => props.theme.pointColor};
    padding-bottom: ${space.xlarge};
    b {
      text-decoration: underline;
      font-weight: ${fontWeight.title};
    }
    small {
      font-weight: ${fontWeight.small};
    }
  }

  &.week_0 {
    background-color: ${(props) => props.theme.weekColor.week_0};
  }
  &.week_1 {
    background-color: ${(props) => props.theme.weekColor.week_1};
  }
  &.week_2 {
    background-color: ${(props) => props.theme.weekColor.week_2};
  }
  &.week_3 {
    background-color: ${(props) => props.theme.weekColor.week_3};
  }
  &.week_4 {
    background-color: ${(props) => props.theme.weekColor.week_4};
  }
  &.week_5 {
    background-color: ${(props) => props.theme.weekColor.week_5};
  }
  &.week_6 {
    background-color: ${(props) => props.theme.weekColor.week_6};
  }
`;

function Week() {
  const [weekData, setWeekData] = useState(day);
  const [dayList, setDayList] = useState(getWeekList(weekData));

  const budgetData = useSelector((state: IState) => state.data.budgetBook);
  const diaryData = useSelector((state: IState) => state.data.diary);
  const scheduleData = useSelector((state: IState) => state.data.schedule);

  const navigation = useNavigate();

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

  // Render the Week list
  const printWeeklyList = dayList.map((list, index) => {
    let total = 0;

    if (budgetData[list]) {
      total = budgetData[list].reduce((prev, current) => {
        return prev + current.amount!;
      }, 0);
    }

    // Get data
    const isToday = list === today ? "today" : "";
    const isDiary = diaryData[list] ? "쪽지" : "";
    const isSchedule = //
      scheduleData[list]
        ? scheduleData[list].map((data) => (
            <span key={data.id}>{data.title}</span>
          ))
        : "";

    const day = getWeek(index);

    return (
      <MyList
        onClick={() => navigation(`/detail/${list}`)}
        key={`week_${index}`}
        className={`week_${index} ${isToday}`}
      >
        <b>{day}</b>

        <small>{list.slice(-2)}일</small>
        <div>
          {total === 0 ? "" : <span>{total} 원 </span>}
          <span>{isSchedule}</span>
          <span>{isDiary}</span>
        </div>
      </MyList>
    );
  });

  return (
    <WeekWrapper>
      <Box>
        <h2>Week</h2>
        <div>
          <button onClick={onPrevWeeks}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <span>{weekData.format("MM")}월</span>
          <button onClick={onNextWeeks}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </Box>
      <ul>{printWeeklyList}</ul>
    </WeekWrapper>
  );
}

export default Week;
