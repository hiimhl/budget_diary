// Render All data list for the date
import React, { useCallback } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DateList from "./UI/DateList";
import Header, { LeftRightBtn } from "./Header";
import { IState } from "../store/actions-type";
import {
  borderRadius,
  colorSet,
  fontSize,
  fontWeight,
  space,
} from "../style-root";
import { Wrapper } from "../routes/Home";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// Style
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${space.basic};
  gap: ${space.middle};
`;

const Card = styled.section`
  background-color: ${(props) => props.theme.weekColor.week_3};
  padding: ${space.basic};
  margin: auto;
  width: 85%;
  height: auto;
  border-radius: ${borderRadius.large};
  position: relative;
  h3 {
    font-size: ${fontSize.large};
    font-weight: ${fontWeight.small};
    margin-bottom: ${space.basic};
  }
`;

const PlusBtn = styled.button`
  position: absolute;
  right: ${space.small};
  top: ${space.basic};
  color: ${colorSet.darkGray};
  font-size: ${fontSize.basic};
`;

// Component
function DatePage() {
  const { date } = useParams();
  const navigation = useNavigate();

  const pageDate = dayjs(date).format("M월 D일");
  const addPageDate = { time: date + "T09:00" }; // send Date data only

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

  const onPrevDay = useCallback(() => navigation(`/${prevDay}`), [prevDay]);
  const onNextDay = useCallback(() => navigation(`/${nextDay}`), [nextDay]);

  const onAddData = (type: string) =>
    navigation(`/new/${type}`, { state: addPageDate });

  return (
    <Wrapper>
      <Header
        leftBtn={
          <LeftRightBtn onClick={onPrevDay}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </LeftRightBtn>
        }
        middleBtn={`${pageDate} 기록`}
        rightBtn={
          <LeftRightBtn onClick={onNextDay}>
            <FontAwesomeIcon icon={faAngleRight} />
          </LeftRightBtn>
        }
      />
      <Content>
        <Card>
          <h3>할일 목록</h3>
          <PlusBtn onClick={() => onAddData("schedule")}>
            <FontAwesomeIcon icon={faPlus} />
          </PlusBtn>
          <ul>
            {schedule &&
              schedule.map((list) => (
                <DateList key={list.id} data={list} type={"schedule"} />
              ))}
          </ul>
        </Card>
        <Card>
          <h3>가계부</h3>
          <PlusBtn onClick={() => onAddData("")}>
            <FontAwesomeIcon icon={faPlus} />
          </PlusBtn>
          <ul>
            {budgetBook &&
              budgetBook.map((list) => (
                <DateList key={list.id} data={list} type={"budgetBook"} />
              ))}
          </ul>
        </Card>
        <Card>
          <h3>일기</h3>
          {diary ? (
            <DateList key={diary.id} data={diary} type={"diary"} />
          ) : (
            <PlusBtn onClick={() => onAddData("diary")}>
              <FontAwesomeIcon icon={faPlus} />
            </PlusBtn>
          )}
        </Card>
      </Content>
    </Wrapper>
  );
}
export default React.memo(DatePage);
