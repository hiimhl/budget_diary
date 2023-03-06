import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
