// Weekly Calendar
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IState } from "../store/actions-type";
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

// Icon - Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCommentDots,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Style
const WeekWrapper = styled.div`
  width: 85%;
  margin: ${space.xlarge} auto;
  padding: ${space.middle};

  ul {
    width: 95%;
    margin: auto;
  }
  z-index: 10;
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
      margin: 0 ${space.basic};
      font-weight: ${fontWeight.small};
    }
    button {
      font-size: ${fontSize.large};
      color: ${colorSet.darkGray};
    }
  }
`;

const MyList = styled.li`
  align-items: baseline;
  font-size: ${fontSize.small};
  cursor: pointer;
  display: grid;
  grid-template-columns: 25% 75%;
  margin: ${space.small} 0;
  padding: ${space.basic} ${space.middle};
  border-radius: ${borderRadius.small};
  box-shadow: ${boxShadow.small};

  /* Today */
  &.today {
    border-top: 4px solid ${(props) => props.theme.pointColor};

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
    b {
      color: ${colorSet.nevative};
    }
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
    b {
      color: ${colorSet.positive};
    }
  }
`;

const TodayDate = styled.div`
  position: relative;
  /* day of the week */
  b {
    font-family: ${font.monospace};
    font-weight: ${fontWeight.small};
    letter-spacing: 0.5px;
    font-size: ${fontSize.basic};
    margin-right: ${space.basic};
    margin-left: ${space.small};
  }
  /* day */
  small {
    font-size: ${fontSize.micro};
  }
`;

const TodayContent = styled.div<{ isPositive: number }>`
  position: relative;
  width: 100%;
  height: 100%;

  /* Total amount */
  .total {
    color: ${(props) =>
      props.isPositive === 1 ? colorSet.positive : colorSet.nevative};
    font-weight: ${fontWeight.small};
    width: 35%;
  }

  /* Schedule list */
  ul {
    width: 100%;
    display: grid;
    grid-template-columns: 45% 55%;

    /* Schedule item */
    li {
      margin: ${space.small} 0;
      margin-right: ${space.small};
      span {
        font-weight: ${fontWeight.small};
      }
      /* icon */
      svg {
        margin-right: ${space.micro};
      }
    }
  }
`;

const TodayIcon = styled.div`
  position: absolute;
  left: -${space.small};
  top: 50%;
  transform: translate(0, -50%);
  background-color: red;
  width: ${space.small};
  height: ${space.small};
  border-radius: 50%;
`;

const Note = styled.i`
  position: absolute;
  right: 0;
  top: 0;
  font-size: ${fontSize.large};
`;

function Week() {
  const [weekData, setWeekData] = useState(day);
  const [dayList, setDayList] = useState(getWeekList(weekData));

  const budgetData = useSelector((state: IState) => state.data.budgetBook);
  const diaryData = useSelector((state: IState) => state.data.diary);
  const scheduleData = useSelector((state: IState) => state.data.schedule);

  const navigation = useNavigate();
  const getMonth = weekData.format("M");

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
    const isDiary = diaryData[list] ? (
      <Note>
        <FontAwesomeIcon icon={faCommentDots} />
      </Note>
    ) : (
      ""
    );

    const isSchedule = //
      scheduleData[list] ? (
        <ul>
          {scheduleData[list].map((data) => (
            <li key={data.id}>
              <FontAwesomeIcon icon={faSquareCheck} />
              <span>{dayjs(data.time).format("H시")} - </span>
              {data.title!.slice(0, 6)}
            </li>
          ))}
        </ul>
      ) : (
        ""
      );

    const day = getWeek(index);
    const isPositive = Math.sign(total);

    return (
      <MyList
        onClick={() => navigation(`/${list}`)}
        key={`week_${index}`}
        className={`week_${index} ${isToday}`}
      >
        <TodayDate>
          <b>{day}</b>
          <small>{list.slice(-2)}일</small>
          {list === today && <TodayIcon />}
        </TodayDate>
        <TodayContent isPositive={isPositive}>
          {total === 0 ? "" : <span className="total">{total}원 </span>}
          {isSchedule}
          {isDiary}
        </TodayContent>
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
          <span>{getMonth}월</span>
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
