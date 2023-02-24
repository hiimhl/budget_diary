import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";

function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
