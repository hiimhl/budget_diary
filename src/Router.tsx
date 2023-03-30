import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import New from "./routes/New";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:date/*" element={<Detail />} />
        <Route path="/new/*" element={<New />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
