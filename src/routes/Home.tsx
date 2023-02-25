import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CreateAmount from "../components/CreateAmount";

// Style
const Wrapper = styled.div`
  width: 650px;
  margin: 0 auto;
  height: 80vh;
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
  width: 65%;
  margin: auto;
  border-radius: 10px;
`;

const Week = styled.div`
  width: 85%;
  margin: 40px auto;
  padding: 20px;
  h2 {
    font-family: ${(props) => props.theme.font.eng};
    font-size: 18px;
  }
  ul {
    width: 95%;
    margin: auto;
    li {
      display: grid;
      grid-template-columns: 10% 10% 80%;
      background-color: pink;
      margin: 10px 0;
      padding: 13px 15px;
      border-radius: 5px;
    }
    .today {
      padding-bottom: 30px;
      border: 1px solid gray;
    }
  }
`;

function Home() {
  // const [isAdd, setIsAdd] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  // console.log(isEdit);

  // Go to Detail page
  const onCardDetail = () => {};

  return (
    <Wrapper>
      <div>
        {/* <CreateAmount /> */}
        <DetailCard>
          <Card onClick={onCardDetail}>
            <h2>12</h2>
            <div>2시 은행 업무</div>
            <div>
              +12,000원 <br />
              -12,000원
            </div>
            <div>쪽지</div>
          </Card>
          <Week>
            <h2>Week</h2>
            <span>❤</span>
            <ul>
              <li>
                <b>MON</b>
                <span>1</span>
                <div>-12,000원 아이콘</div>
              </li>
              <li>
                <b>TUE</b>
                <span>2</span>
                <div>+2,000원 아이콘</div>
              </li>
              <li className="today">
                <b>WED</b>
                <span>3</span>
                <div>+2,000원 아이콘</div>
              </li>
              <li>
                <b>THU</b>
                <span>4</span>
                <div>+2,000원 아이콘</div>
              </li>
              <li>
                <b>FRI</b>
                <span>5</span>
                <div>+2,000원 아이콘</div>
              </li>
              <li>
                <b>SAT</b>
                <span>6</span>
                <div>+2,000원 아이콘</div>
              </li>
              <li>
                <b>SUN</b>
                <span>7</span>
                <div>+2,000원 아이콘</div>
              </li>
            </ul>
          </Week>
        </DetailCard>
      </div>
    </Wrapper>
  );
}

export default Home;
