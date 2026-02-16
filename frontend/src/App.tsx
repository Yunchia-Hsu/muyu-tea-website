import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CourseContent from "./pages/CourseContent";
import Navbar from "./components/Navbar";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import AuthModal from "./contexts/AuthModal";

import "./App.css";
function App() {
  return (
    <AuthModalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coursecontent/:id" element={<CourseContent />} />
          <Route path="/coursecontent" element={<Navigate to="/" replace />} />
          <Route path="/course" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <AuthModal />
    </AuthModalProvider>
  );
}

export default App;
