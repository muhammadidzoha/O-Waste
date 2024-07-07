import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/root/layout/Layout";
import Login from "./pages/auth/Login";
import NotFound from "./components/ui/NotFound";
import Dashboard from "./pages/root/Dashboard";
import UserManagement from "./pages/root/UserManagement";
import ArticleManagement from "./pages/root/ArticleManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/article-management" element={<ArticleManagement />} />
      </Route>
      <Route path="auth/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
