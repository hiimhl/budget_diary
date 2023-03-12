import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header";
import TodayCard from "../components/TodayCard";
import Week from "../components/Week";
import { IBudget, IState } from "../store";
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

type Idd = [string, string];

function Home() {
  const [add, setAdd] = useState(false);

  const dayList = getWeekList(day);

  const budgetData = useSelector((state: IState) => state.data.budgetBook);
  const DiaryData = useSelector((state: any) => state.diary);

  return (
    <Wrapper>
      <Header leftBtn={"Today"} middleBtn={"Add"} rightBtn={"Month"} />
      {/* <CreateAmount /> */}
      {/* <CreateDiary /> */}
      <DetailCard>
        <TodayCard />
        <Week />
      </DetailCard>
    </Wrapper>
  );
}

export default Home;
