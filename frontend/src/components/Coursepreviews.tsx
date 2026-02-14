import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courseAPI } from "../services/api";
import type { Course } from "../services/api";
import OptimizedImage from "./OptimizedImage";
import { useAuthModal } from "../contexts/AuthModalContext";
import { courseSlug } from "../utils/slugify";
import "./Coursepreviews.css";

function Coursepreview() {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const { openAuthModal } = useAuthModal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  // check pictures' loading status
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  // fetch courses content from API
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const data = await courseAPI.getAllCourses();
        setCourses(data);
      } catch (err) {
        // Handle session expired - redirect to login
        if (err instanceof Error && err.message === "SESSION_EXPIRED") {
          openAuthModal("login");
          return;
        }
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses"
        );
        console.error("Error fetching courses:", err);
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

  const getVisibleImages = () => {
    const left = centerIndex === 0 ? courses.length - 1 : centerIndex - 1;
    const center = centerIndex;
    const right = centerIndex === courses.length - 1 ? 0 : centerIndex + 1;
    return [left, center, right];
  };

  const [leftIdx, centerIdx, rightIdx] = getVisibleImages();

  // Helper to generate course URL with slug
  const getCourseUrl = (course: Course | undefined) =>
    course ? `/coursecontent/${courseSlug(course.id, course.title)}` : "#";

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
          {/* left side course card*/}
          <div
            className="course-card course-card-left"
            onClick={() => navigate(getCourseUrl(courses[leftIdx]))}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(getCourseUrl(courses[leftIdx]))
            }
            role="button"
            tabIndex={0}
            aria-label={`View course: ${courses[leftIdx]?.title}`}
          >
            <div className="course-image">
              {!loadedImages.has(leftIdx) && <div className="image-skeleton" />}
              <OptimizedImage
                src={courses[leftIdx]?.image_url ?? "/images/tea-intro.png"}
                alt={courses[leftIdx]?.title ?? "Course image"}
                onLoad={() => handleImageLoad(leftIdx)}
                style={{ opacity: loadedImages.has(leftIdx) ? 1 : 0 }}
              />
            </div>
            <div className="course-info">
              <h3>{courses[leftIdx]?.title}</h3>
            </div>
          </div>

          {/* middle side course card*/}
          <div
            className="course-card course-card-center"
            onClick={() => navigate(getCourseUrl(courses[centerIdx]))}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(getCourseUrl(courses[centerIdx]))
            }
            role="button" //accessibility
            tabIndex={0}
            aria-label={`View course: ${courses[centerIdx]?.title}`} // can be read out 「View course: xxx」
          >
            <div className="course-image">
              {!loadedImages.has(centerIdx) && (
                <div className="image-skeleton" />
              )}
              <OptimizedImage
                src={courses[centerIdx]?.image_url ?? "/images/tea-intro.png"}
                alt={courses[centerIdx]?.title ?? "Course image"}
                onLoad={() => handleImageLoad(centerIdx)}
                style={{ opacity: loadedImages.has(centerIdx) ? 1 : 0 }}
              />
            </div>
            <div className="course-info">
              <h3>{courses[centerIdx]?.title}</h3>
            </div>
          </div>

          {/* right side course card */}
          <div
            className="course-card course-card-right"
            onClick={() => navigate(getCourseUrl(courses[rightIdx]))}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(getCourseUrl(courses[rightIdx]))
            }
            role="button"
            tabIndex={0}
            aria-label={`View course: ${courses[rightIdx]?.title}`}
          >
            <div className="course-image">
              {!loadedImages.has(rightIdx) && (
                <div className="image-skeleton" />
              )}
              <OptimizedImage
                src={courses[rightIdx]?.image_url ?? "/images/tea-intro.png"}
                alt={courses[rightIdx]?.title ?? "Course image"}
                onLoad={() => handleImageLoad(rightIdx)}
                style={{ opacity: loadedImages.has(rightIdx) ? 1 : 0 }}
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
