import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LogIn";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

function WebRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="service/*" element={<Main />}>
          <Route index element={<Navigate to="/service/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="detail/:title" element={<Detail />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/service" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default WebRouter;
