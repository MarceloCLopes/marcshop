import React from "react";
import { Route, Routes } from "react-router-dom";
import { Contato } from "./pages/Contato";
import { Home } from "./pages/Home";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Contato" element={<Contato />} />
    </Routes>
  );
}
