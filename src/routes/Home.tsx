import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Month from "../components/Month";
import TodayCard from "../components/TodayCard";
import Week from "../components/Week";
import { IState } from "../store";
import { borderRadius, boxShadow, font, fontSize, space } from "../style-root";
import { day, getWeek, getWeekList, today } from "../util/day";

// Style
export const Wrapper = styled.div`
  width: 650px;
  margin: 0 auto;
  height: 100vh;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${boxShadow.large};

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailCard = styled.div`
  height: 300px;
  width: 100%;
`;

function Home() {
  const [isToday, setIsToday] = useState(false);

  const dayList = getWeekList(day);
  const navigation = useNavigate();

  const DiaryData = useSelector((state: any) => state.diary);
  const onCreate = () => navigation("/new");

  const onIsToday = () => setIsToday(false);
  const onIsMonth = () => setIsToday(true);

  return (
    <Wrapper>
      <Header
        leftBtn={<button onClick={onIsToday}>Today</button>}
        middleBtn={<button onClick={onCreate}>추가하기</button>}
        rightBtn={<button onClick={onIsMonth}>Month</button>}
      />
      <DetailCard>
        {isToday ? (
          <Month />
        ) : (
          <>
            <TodayCard />
            <Week />
          </>
        )}
      </DetailCard>
    </Wrapper>
  );
}

export default Home;
