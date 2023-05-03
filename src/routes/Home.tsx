import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Month from "../components/Month";
import TodayCard from "../components/TodayCard";
import Week from "../components/Week";
import { boxShadow } from "../style-root";
import { useDispatch, useSelector } from "react-redux";
import { IState, SET_VIEW } from "../store/actions-type";

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
  const [isToday, setIsToday] = useState(true);
  const userView = useSelector((state: IState) => state.user.todayView);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const onCreate = () => navigation("/new");

  useEffect(() => {
    setIsToday(userView);
  }, [userView]);

  const onIsToday = () => {
    setIsToday(true);
    dispatch({ type: SET_VIEW, data: { todayView: true } });
  };

  const onIsMonth = useCallback(() => {
    setIsToday(false);
    dispatch({ type: SET_VIEW, data: { todayView: false } });
  }, [isToday]);

  return (
    <Wrapper>
      <Header
        leftBtn={<button onClick={onIsToday}>Today</button>}
        middleBtn={<button onClick={onCreate}>추가하기</button>}
        rightBtn={<button onClick={onIsMonth}>Month</button>}
      />
      <DetailCard>
        {isToday ? (
          <>
            <TodayCard />
            <Week />
          </>
        ) : (
          <Month />
        )}
      </DetailCard>
    </Wrapper>
  );
}

export default Home;
