import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateAmount from "../components/CreateAmount";
import CreateDiary from "../components/CreateDiary";
import CreateSchedule from "../components/CreateSchedule";
import Header from "../components/Header";
import { Wrapper } from "./Home";

function New() {
  const navigation = useNavigate();
  // choose the diary/amount/schedule
  return (
    <Wrapper>
      <Header />
      <button onClick={() => navigation("/new/diary")}>diary</button>
      <Routes>
        <Route path="/diary" element={<CreateDiary />} />
        <Route path="/amout" element={<CreateAmount />} />
        <Route path="/" element={<CreateSchedule />} />
      </Routes>
    </Wrapper>
  );
}

export default New;
