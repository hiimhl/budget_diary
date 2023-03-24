import { Route, Routes } from "react-router-dom";
import DetailPage from "../components/DetailPage";
import DatePage from "../components/DatePage";

function Detail() {
  return (
    <Routes>
      <Route path="/" element={<DatePage />} />
      <Route path="/:type/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default Detail;
