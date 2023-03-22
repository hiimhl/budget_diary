import { Route, Routes } from "react-router-dom";
import DetailItem from "../components/DetailItem";
import DetailPage from "../components/DetailPage";

function Detail() {
  return (
    <Routes>
      <Route path="/" element={<DetailPage />} />
      <Route path="/:type/:id" element={<DetailItem />} />
    </Routes>
  );
}

export default Detail;
