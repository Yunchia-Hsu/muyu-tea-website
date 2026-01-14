import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {courseAPI} from "../services/api";
// import advanceTeaBrewing from "../assets/tea-brewing.png";
// import travelWithTea from "../assets/travel-with-tea.png";
// import teaTypeIntro from "../assets/tea-history.png";
// import teahistory from "../assets/tea-type-intro.png";
import "./Coursepreviews.css";

// // 預設圖片映射
// const defaultImages = [teaTypeIntro,advanceTeaBrewing, teahistory, travelWithTea];

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url?: string;
}

function Coursepreview() {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);

  // 從 API 獲取課程資料
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const data = await courseAPI.getAllCourses();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const handlePrev = () => {
    setCenterIndex((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
  };

  // 計算左中右三張圖片的索引
  const getVisibleImages = () => {
    const left = centerIndex === 0 ? courses.length - 1 : centerIndex - 1;
    const center = centerIndex;
    const right = centerIndex === courses.length - 1 ? 0 : centerIndex + 1;
    return [left, center, right];
  };

  const [leftIdx, centerIdx, rightIdx] = getVisibleImages();

  if (loading) {
    return (
      <header className="Coursepreview">
        <div className="loading-message">Loading courses...</div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="Coursepreview">
        <div className="error-message">Error: {error}</div>
      </header>
    );
  }

  if (courses.length === 0) {
    return (
      <header className="Coursepreview">
        <div className="empty-message">No courses available</div>
      </header>
    );
  }

  return (
    <header className="Coursepreview">
      <div className="carousel-wrapper">
        <button className="carousel-btn carousel-btn-prev" onClick={handlePrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 18L8 12L14 6"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="courses-container">
          {/* 左邊課程卡片 */}
          <div className="course-card course-card-left">
            <div className="course-image">
              <img
                src={courses[leftIdx]?.image_url ?? "/images/tea-intro.png"}
                alt={courses[leftIdx]?.title}
              />
            </div>
            <div className="course-info">
              <h3>{courses[leftIdx]?.title}</h3>
            </div>
          </div>

          {/* 中間課程卡片（最大） */}
          <div className="course-card course-card-center">
            <div className="course-image">
              <img
                src={courses[centerIdx]?.image_url ?? "/images/tea-intro.png"}
                alt={courses[centerIdx]?.title}
              />
            </div>
            <div className="course-info">
              <h3>{courses[centerIdx]?.title}</h3>
              {/* <p className="course-description">{courses[centerIdx]?.description}</p> */}
              <button 
              onClick={() => navigate(`/coursecontent/${courses[centerIdx]?.id}`)}
              className="classbutton"
              >Go to the course</button>
            </div>
          </div>

          {/* 右邊課程卡片 */}
          <div className="course-card course-card-right">
            <div className="course-image">
              <img
                src={courses[rightIdx]?.image_url ?? "/images/tea-intro.png"}
                alt={courses[rightIdx]?.title}
              />
            </div>
            <div className="course-info">
              <h3>{courses[rightIdx]?.title}</h3>
            </div>
          </div>
        </div>

        <button className="carousel-btn carousel-btn-next" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 18L14 12L8 6"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Coursepreview;
