import { useState } from "react";
import teaBrewing from "../assets/tea-brewing.png";
import travelWithTea from "../assets/travel-with-tea.png";
import teaTypeIntro from "../assets/tea-type-intro.png";
import "./Coursepreviews.css";

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
