import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CourseContent from "./pages/CourseContent";
// import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Teaintro from "./components/TeaIntro";
// import Login from "./components/Login";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import AuthModal from "./components/AuthModal";

import "./App.css";
function App() {
  return (
    <AuthModalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/coursecontent/:id" element={<CourseContent />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/teaintro" element={<Teaintro />} />
          {/* Redirect invalid routes to home */}
          <Route path="/coursecontent" element={<Navigate to="/" replace />} />
          <Route path="/course" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} /> // no match route redirect to home
        </Routes>
      </BrowserRouter>
      <AuthModal /> 
    </AuthModalProvider>
  );
}

export default App;
