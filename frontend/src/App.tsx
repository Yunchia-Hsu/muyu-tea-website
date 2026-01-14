import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Route path="/register"element={<Register />} />
        <Route path="/coursecontent/:id" element={<CourseContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teaintro" element={<Teaintro/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
