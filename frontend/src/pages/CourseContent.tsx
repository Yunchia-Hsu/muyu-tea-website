import PageLayout from "../layouts/PageLayout";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import "../components/Header.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import Header from "../components/Header";
import "./CourseContent.css";

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function Coursecontent() {
  const { id } = useParams<{ id: string }>(); // 從 URL 獲取課程 ID
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enroll, setEnroll] = useState(false);
  const [enrollmsg, setEnrollmsg] = useState<string | null>(null);
  // 從 API 獲程詳細資料
  useEffect(() => {
    async function fetchCourse() {
      if (!id) {
        setError("invalid course ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await courseAPI.getCourse(Number(id));
        setCourse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch course");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  // 載入中
  if (loading) {
    return (
      <PageLayout>
        <Header />
        <div className="loading-message">Loading course...</div>
      </PageLayout>
    );
  }

  // 錯誤狀態
  if (error) {
    return (
      <PageLayout>
        <Header />
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => navigate("/")}>go home</button>
        </div>
      </PageLayout>
    );
  }

  const handleEnroll = async () => {
    try {
        setEnrollmsg (null);
        setEnroll (true);
        const token = localStorage.getItem ("token");
        if (!token){
          navigate ("/login");
          return;
        }
        await courseAPI.enrollCourse(course.id, token);
        setEnrollmsg("Thank you for enrolled the course.");
    }catch (error){
        console.error ("enroll failed:", error);
        if (error instanceof Error){
          setEnrollmsg (error.message);
        } else {
          setEnrollmsg ("enroll failed");
        }}    
    finally { setEnroll (false)};
    };

  // 課程不存在
  if (!course) {
    return (
      <PageLayout>
        <Header />
        <div className="error-message">
          <p>the course doesn't exist</p>
          <button onClick={() => navigate("/")}>go home</button>
        </div>
      </PageLayout>
    );
  }
 
 
  return (
    <PageLayout>
      <Header />
      {/* 顯示課程資料 */}
      <div className="image-wrapper">
        <img src={course.image_url ?? "/images/tea-intro.png" }alt={course.title}/>
      </div>
      <div className="textcontainer">
        <h1 className="coursetitle">{course.title}</h1>
        <p className="courseintro">{course.description}</p>
        <p className="course-price">Price: NT$ {course.price}</p>
        <br/>
        <button 
        className="register-button"
        onClick={handleEnroll}
        disabled={enroll}> {enroll? "Registering...": "Register the course"}</button>
        {enrollmsg && <p className="enroll-message">{enrollmsg}</p>}
      </div>
    </PageLayout>
  );
};
