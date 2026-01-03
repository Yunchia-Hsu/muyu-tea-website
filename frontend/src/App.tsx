import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseContent from "./pages/CourseContent";
import Login from "./pages/Login";
import Loginin from "./pages/Loginin";
import Navbar from "./components/Navbar";
import Teaintro from "./components/TeaIntro";

import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coursecontent" element={<CourseContent />} />
        <Route path="/loginin" element={<Loginin />} />
        <Route path="/teaintro" element={<Teaintro/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
