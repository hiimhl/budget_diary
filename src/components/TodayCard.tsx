import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "../store";
import { useNavigate } from "react-router-dom";
import { dayOfWeek, today } from "../util/day";
import {
  borderRadius,
  colorSet,
  fontSize,
  fontWeight,
  space,
} from "../style-root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faSquare } from "@fortawesome/free-regular-svg-icons";

// Style
const Card = styled.section`
  background-color: ${(props) => props.theme.weekColor.week_2};
  padding: 15px;
  height: 250px;
  width: 75%;
  margin: auto;
  border-radius: ${borderRadius.large};
  cursor: pointer;
`;

const DateBox = styled.div`
  margin-bottom: ${space.basic};
  h2 {
    display: inline-block;
  }
`;

const Content = styled.div`
  background-color: ${colorSet.white};
  padding: ${space.middle};
  border-radius: ${borderRadius.small};
  cursor: pointer;
  height: auto;

  /* All headers */
  b {
    font-weight: ${fontWeight.small};
  }
`;
const InfoBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${space.small};

  span {
    display: grid;
    grid-template-columns: 23% 75%;
  }
`;
const ScheduleList = styled.div`
  display: grid;
  grid-template-columns: 23% 75%;
  margin-top: ${space.basic};

  b {
    display: block;
  }
  ul {
    li {
      margin-bottom: ${space.micro};
      /* icon */
      svg {
        margin-right: ${space.micro};
        font-size: ${fontSize.small};
      }
    }
  }
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
  const onToDetail = () => navigation(`/${today}`);
  const onCreate = () => navigation("/new");

  return (
    <Card onClick={onToDetail}>
      <DateBox>
        <h2>{today.slice(-2)}일</h2> <span>{dayOfWeek}</span>
      </DateBox>
      {todayBudget || todayDiary || todaySchdule ? (
        <Content>
          <InfoBox>
            <span>
              <b>총 지출 : </b>
              {totalAmount}원
            </span>
            {todayDiary && (
              <span>
                <b>오늘의 기록 : </b>
                {todayDiary.title}
                <i>{todayDiary.emoji}</i>
              </span>
            )}
          </InfoBox>
          <ScheduleList>
            <b>할일 : </b>
            <ul>
              {todaySchdule &&
                todaySchdule.map((data) => (
                  <li key={data.id}>
                    <FontAwesomeIcon icon={faSquare} />
                    {data.title}
                  </li>
                ))}
            </ul>
          </ScheduleList>
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
