import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CreateAmount from "../components/CreateAmount";
import CreateDiary from "../components/CreateDiary";
import CreateSchedule from "../components/CreateSchedule";
import Header from "../components/Header";
import { Wrapper } from "./Home";

function New() {
  const navigation = useNavigate();
  // choose the diary/amount/schedule

  const location = useLocation();
  // console.log(location);

  return (
    <Wrapper>
      <Header
        leftBtn={<button onClick={() => navigation("/new/")}>가계부</button>}
        middleBtn={
          <button onClick={() => navigation("/new/diary")}>일기</button>
        }
        rightBtn={
          <button onClick={() => navigation("/new/schedule")}>할일</button>
        }
      />

      <Routes>
        <Route path="/diary" element={<CreateDiary />} />
        <Route path="/" element={<CreateAmount />} />
        <Route path="/schedule" element={<CreateSchedule />} />
      </Routes>
    </Wrapper>
  );
}

export default New;
