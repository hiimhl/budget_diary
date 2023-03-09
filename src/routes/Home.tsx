import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CreateAmount from "../components/CreateAmount";
import CreateDiary from "../components/CreateDiary";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import Week from "../components/Week";
import { IBudget, IState } from "../store";
import { borderRadius, font, fontSize, rainbow, space } from "../style-root";
import { day, getWeek, getWeekList, today } from "../util/day";

// Style
export const Wrapper = styled.div`
  width: 650px;
  margin: 0 auto;
  height: 100vh;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${(props) => props.theme.boxShadow};

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailCard = styled.div`
  height: 300px;
  width: 100%;
`;

const Card = styled.div`
  /* background-color: ${(props) => props.theme.pointColor}; */
`;

type Idd = [string, string];

function Home() {
  const [add, setAdd] = useState(false);

  const dayList = getWeekList(day);

  const budgetData = useSelector((state: IState) => state.data.budgetBook);
  const DiaryData = useSelector((state: any) => state.diary);

  const theme = "rainbow";

  return (
    <Wrapper>
      <Header />
      <CreateAmount />
      {/* <CreateDiary /> */}
      <DetailCard>
        <TodayCard />
        <Week />
      </DetailCard>
    </Wrapper>
  );
}

export default Home;
