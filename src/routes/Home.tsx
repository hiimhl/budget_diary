import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CreateAmount from "../components/CreateAmount";
import CreateDiary from "../components/CreateDiary";
import Header from "../components/Header";
import { borderRadius, font, fontSize, space } from "../style-root";

// Style
const Wrapper = styled.div`
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
  background-color: pink;
  padding: 15px;
  height: 250px;
  width: 75%;
  margin: auto;
  border-radius: ${borderRadius.large};
`;

const Week = styled.div`
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
      display: grid;
      grid-template-columns: 10% 10% 80%;
      background-color: pink;
      margin: ${space.small} 0;
      padding: 13px ${space.middle};
      border-radius: ${borderRadius.small};
      border-top: 10px red solid;
    }
    .today {
      padding-bottom: ${space.large};
    }
  }
`;

function Home() {
  // const [isAdd, setIsAdd] = useState(false);

  // Go to Detail page
  const onCardDetail = () => {};
  const budgetData = useSelector((state: any) => state.budgetBook);

  const getDate = (newDate: any) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getDate(new Date());
  console.log(today);
  let todayData = {};

  return (
    <Wrapper>
      <Header />
      {/* <CreateAmount /> */}
      <CreateDiary />
      <DetailCard>
        <Card onClick={onCardDetail}>
          {/* { budgetData.map((data:any)=>data.date===today ? <>
          <h2>{data.title}</h2>
          <div>{data.title}</div>
          <div>
          {data.title} <br />
          {data.title}
          </div>
          <div>쪽지</div>
        </>:<span>일정을 추가해주세요</span>)}
           */}
        </Card>
        <Week>
          <h2>Week</h2>
          <span>❤</span>
          <ul>
            <li className={`mon`}>
              <b>MON</b>
              <span>1</span>
              <div>-12,000원 아이콘</div>
            </li>
            <li className={`tue`}>
              <b>TUE</b>
              <span>2</span>
              <div>+2,000원 아이콘</div>
            </li>
            <li className={`wen`}>
              <b>WED</b>
              <span>3</span>
              <div>+2,000원 아이콘</div>
            </li>
            <li className={`thu`}>
              <b>THU</b>
              <span>4</span>
              <div>+2,000원 아이콘</div>
            </li>
            <li className={`fri`}>
              <b>FRI</b>
              <span>5</span>
              <div>+2,000원 아이콘</div>
            </li>
            <li className={`sat`}>
              <b>SAT</b>
              <span>6</span>
              <div>+2,000원 아이콘</div>
            </li>
            <li className={`sun`}>
              <b>SUN</b>
              <span>7</span>
              <div>+2,000원 아이콘</div>
            </li>
          </ul>
        </Week>
      </DetailCard>
    </Wrapper>
  );
}

export default Home;
