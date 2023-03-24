import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "../store";
import { useNavigate } from "react-router-dom";
import { day, today } from "../util/day";
import {
  borderRadius,
  colorSet,
  fontSize,
  fontWeight,
  space,
} from "../style-root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";

// Style
const Card = styled.section`
  background-color: ${(props) => props.theme.weekColor.week_2};
  padding: ${space.basic};
  height: 250px;
  width: 75%;
  margin: auto;
  margin-top: ${space.basic};
  border-radius: ${borderRadius.large};
  cursor: pointer;
`;

const DateBox = styled.div`
  text-align: center;
  margin-bottom: ${space.basic};
  font-size: 17px;
  font-weight: ${fontWeight.small};
  padding: 0 ${space.micro};
  position: relative;

  h2 {
    display: inline-block;
    margin-right: ${space.small};
    margin-top: ${space.micro};
  }
  i {
    position: absolute;
    right: 0;
  }
`;

const Content = styled.div`
  background-color: ${colorSet.white};
  padding: ${space.middle};
  border-radius: ${borderRadius.small};
  cursor: pointer;
  height: 82%;

  /* hide scrollbar */
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

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
    grid-template-columns: 35% 65%;
    padding-bottom: ${space.micro};
    border-bottom: 2px dashed ${colorSet.lightGray};
  }
`;

const ScheduleList = styled.div`
  position: relative;
  margin-top: ${space.basic};

  b {
    position: absolute;
    top: 0;
    padding-bottom: ${space.micro};
  }
  ul {
    li {
      margin-bottom: ${space.micro};
      padding-left: 35%;
      padding-bottom: ${space.micro};
      border-bottom: 2px dashed ${colorSet.lightGray};

      /* icon */
      svg {
        margin-right: ${space.micro};
        font-size: ${fontSize.small};
      }
      /* time */
      small {
        font-weight: ${fontWeight.small};
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
        <h2>{day.format("M월 D일 dddd")}</h2>
        {todayDiary && <i>{todayDiary.emoji}</i>}
      </DateBox>
      {todayBudget || todayDiary || todaySchdule ? (
        <Content>
          <InfoBox>
            <span>
              <b>총 지출 : </b>
              {totalAmount}원
            </span>
            <span>
              <b>오늘의 기록 : </b>
              {todayDiary && <>{todayDiary.title}...</>}
            </span>
          </InfoBox>
          <ScheduleList>
            <b>할일 : </b>
            <ul>
              {todaySchdule &&
                todaySchdule.map((data) => (
                  <li key={data.id}>
                    <FontAwesomeIcon icon={faSquare} />
                    <small>{dayjs(data.startDate).format("A h시")} - </small>
                    <span>{data.title}</span>
                  </li>
                ))}
            </ul>
          </ScheduleList>
        </Content>
      ) : (
        <span style={{ margin: 5 }}>일정을 추가해주세요. 😊</span>
      )}
    </Card>
  );
}

export default TodayCard;
