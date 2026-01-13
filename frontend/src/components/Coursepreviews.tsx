import { useState, useEffect } from "react";
import {courseAPI} from "../services/api";
import teaBrewing from "../assets/tea-brewing.png";
import travelWithTea from "../assets/travel-with-tea.png";
import teaTypeIntro from "../assets/tea-type-intro.png";
import "./Coursepreviews.css";

// // 預設圖片映射（如果 API 沒有圖片）
// const defaultImages = [teaBrewing, travelWithTea, teaTypeIntro];

// interface Course {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   image_url?: string;
// }

// function Coursepreview() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [centerIndex, setCenterIndex] = useState(1);

//   // 從 API 獲取課程資料
//   useEffect(() => {
//     async function fetchCourses() {
//       try {
//         setLoading(true);
//         const data = await courseAPI.getAllCourses();
//         setCourses(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch courses');
//         console.error('Error fetching courses:', err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCourses();
//   }, []);

//   const handlePrev = () => {
//     setCenterIndex((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCenterIndex((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
//   };

//   const getVisibleImages = () => {
//     if (courses.length === 0) return [0, 0, 0];
//     const left = centerIndex === 0 ? courses.length - 1 : centerIndex - 1;
//     const center = centerIndex;
//     const right = centerIndex === courses.length - 1 ? 0 : centerIndex + 1;
//     return [left, center, right];
//   };

//   const [leftIdx, centerIdx, rightIdx] = getVisibleImages();

//   if (loading) {
//     return <div className="Coursepreview">Loading courses...</div>;
//   }

//   if (error) {
//     return <div className="Coursepreview">Error: {error}</div>;
//   }

//   if (courses.length === 0) {
//     return <div className="Coursepreview">No courses available</div>;
//   }

//   return (
//     <header className="Coursepreview">
//       <div className="carousel-wrapper">
//         <button className="carousel-btn carousel-btn-prev" onClick={handlePrev}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M15 18L9 12L15 6"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>

//         <div className="courses-container">
//           <div className="course-card">
//             <img 
//               src={courses[leftIdx]?.image_url || defaultImages[leftIdx % defaultImages.length]} 
//               alt={courses[leftIdx]?.title} 
//             />
//             <p>{courses[leftIdx]?.title}</p>
//           </div>
//           <div className="course-card center">
//             <img 
//               src={courses[centerIdx]?.image_url || defaultImages[centerIdx % defaultImages.length]} 
//               alt={courses[centerIdx]?.title} 
//             />
//             <h3>{courses[centerIdx]?.title}</h3>
//             <p>{courses[centerIdx]?.description}</p>
//             <p className="price">NT$ {courses[centerIdx]?.price}</p>
//           </div>
//           <div className="course-card">
//             <img 
//               src={courses[rightIdx]?.image_url || defaultImages[rightIdx % defaultImages.length]} 
//               alt={courses[rightIdx]?.title} 
//             />
//             <p>{courses[rightIdx]?.title}</p>
//           </div>
//         </div>

//         <button className="carousel-btn carousel-btn-next" onClick={handleNext}>
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M9 18L15 12L9 6"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Coursepreview;







const courses = [
  { src: teaBrewing, alt: "Tea Brewing Course" },
  { src: travelWithTea, alt: "Travel with Tea Course" },
  { src: teaTypeIntro, alt: "Tea Type Introduction Course" },
];

function Coursepreview() {
  const [centerIndex, setCenterIndex] = useState(1);

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

  return (
    <header className="Coursepreview">
      <div className="carousel-wrapper">
        <button className="carousel-btn carousel-btn-prev" onClick={handlePrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="courses-container">
          <img src={courses[leftIdx].src} alt={courses[leftIdx].alt} />
          <img src={courses[centerIdx].src} alt={courses[centerIdx].alt} />
          <img src={courses[rightIdx].src} alt={courses[rightIdx].alt} />
        </div>

        <button className="carousel-btn carousel-btn-next" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
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
