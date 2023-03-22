import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DetailList from "./UI/DetailList";
import Header from "../components/Header";
import { IState } from "../store";
import { borderRadius, fontSize, fontWeight, space } from "../style-root";
import { Wrapper } from "../routes/Home";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Style
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.section`
  background-color: ${(props) => props.theme.weekColor.week_3};
  padding: ${space.basic};
  margin: auto;
  width: 85%;
  height: auto;
  border-radius: ${borderRadius.large};

  h3 {
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.small};
    margin-bottom: ${space.basic};
  }
`;

// Component
function DetailPage() {
  const { date } = useParams();
  const navigation = useNavigate();

  const month = date?.slice(5, 7);
  const day = date?.slice(-2);

  // Get data
  const data = useSelector((state: IState) => state.data);
  const diary = data.diary[date!];
  const budgetBook = data.budgetBook[date!];
  const schedule = data.schedule[date!];

  // Go to Previous or Next page

  const getNextDay = dayjs(date).add(1, "day");
  const nextDay = getNextDay.format("YYYY-MM-DD");

  const getPrevDay = dayjs(date).subtract(1, "day");
  const prevDay = getPrevDay.format("YYYY-MM-DD");

  const onPrevDay = () => navigation(`/detail/${prevDay}`);
  const onNextDay = () => navigation(`/detail/${nextDay}`);

  return (
    <Wrapper>
      <Header
        leftBtn={
          <button onClick={onPrevDay}>
            <FontAwesomeIcon icon={faAngleLeft} className="leftRightBtn" />
          </button>
        }
        middleBtn={`${month}월 ${day}일 기록`}
        rightBtn={
          <button onClick={onNextDay}>
            <FontAwesomeIcon icon={faAngleRight} className="leftRightBtn" />
          </button>
        }
      />
      <Content>
        <Card>
          <h3>할일 목록</h3>
          <ul>
            {schedule &&
              schedule.map((list) => (
                <DetailList key={list.id} data={list} type={"schedule"} />
              ))}
          </ul>
        </Card>
        <Card>
          <h3>가계부</h3>
          <ul>
            {budgetBook &&
              budgetBook.map((list) => (
                <DetailList key={list.id} data={list} type={"budget"} />
              ))}
          </ul>
        </Card>
        <Card>
          <h3>일기</h3>
          {diary && <DetailList key={diary.id} data={diary} type={"diary"} />}
        </Card>
      </Content>
    </Wrapper>
  );
}
export default DetailPage;
