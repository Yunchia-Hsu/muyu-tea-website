import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CourseContent from "./pages/CourseContent";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Teaintro from "./components/TeaIntro";
import Login from "./pages/Login";

import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coursecontent/:id" element={<CourseContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teaintro" element={<Teaintro />} />
        {/* Redirect invalid routes to home */}
        <Route path="/coursecontent" element={<Navigate to="/" replace />} />
        <Route path="/course" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />   // no match route redirect to home
      </Routes>
    </BrowserRouter>
  );
}

export default App;
