import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../routes/Home";
import { IState } from "../store";
import Header from "./Header";

function DetailItem() {
  const navigation = useNavigate();

  const { date: pageDate, id, type } = useParams();

  const diary = useSelector((state: IState) => state.data.diary[pageDate!]);

  const budgetBook = useSelector((state: IState) =>
    state.data.budgetBook[pageDate!].find((item) => item.id === id)
  );

  const schedule = useSelector((state: IState) =>
    state.data.schedule[pageDate!].find((item) => item.id === id)
  );
  console.log(diary, budgetBook, schedule);

  // Go daily list
  const onGoDetailList = () => navigation(-1);

  return (
    <Wrapper>
      <Header
        leftBtn={<button onClick={onGoDetailList}>돌아가기</button>}
        middleBtn={<button>수정</button>}
        rightBtn={<button>삭제</button>}
      />
      {type === "diary" && diary && (
        <div>
          <div>{diary.title}</div>
          <div>{diary.date}</div>
          <div>{diary.memo}</div>
        </div>
      )}
    </Wrapper>
  );
}

export default DetailItem;
