import PageLayout from "../layouts/PageLayout";
import "../styles/global.css";
import "../components/Header.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import Header from "../components/Header";
import OptimizedImage from "../components/OptimizedImage";
import { useAuthModal } from "../contexts/AuthModalContext";
import { extractIdFromSlug, courseSlug } from "../utils/slugify";
import "./CourseContent.css";
import type { Course } from "../services/api";

// Error types for better UX
type ErrorType = "NOT_FOUND" | "NETWORK" | "INVALID_ID" | null;

export default function Coursecontent() {
  const { id } = useParams<{ id: string }>(); // get course id from url
  const navigate = useNavigate();
  const { openAuthModal } = useAuthModal();
  const [course, setCourse] = useState<Course | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [enroll, setEnroll] = useState(false);
  const [enrollmsg, setEnrollmsg] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Auto redirect countdown when error occurs
  useEffect(() => {
    if (!errorType) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [errorType, navigate]);

  // Reset state when course id changes
  useEffect(() => {
    setImageLoaded(false);
    setEnrollmsg(null);
    setError(null);
    setErrorType(null);
  }, [id]);

  useEffect(() => {
    async function fetchCourse() {
      // Extract and validate ID from slug (e.g., "1-tea-brewing" → 1)
      const courseId = id ? extractIdFromSlug(id) : -1;
      if (courseId < 0) {
        setError("Invalid course ID");
        setErrorType("INVALID_ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [data, all] = await Promise.all([
          courseAPI.getCourse(courseId),
          courseAPI.getAllCourses(),
        ]);

        if (!data) {
          setError("Course not found");
          setErrorType("NOT_FOUND");
          return;
        }

        setCourse(data);
        setAllCourses(all);
      } catch (err) {
        // Handle session expired - open login modal
        if (err instanceof Error && err.message === "SESSION_EXPIRED") {
          openAuthModal("login");
          return;
        }

        // Determine error type
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch course";

        if (errorMessage.includes("not found") || errorMessage.includes("404")) {
          setErrorType("NOT_FOUND");
        } else {
          setErrorType("NETWORK");
        }

        setError(errorMessage);
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageLayout>
        <Header />
        <div className="loading-message">Loading course...</div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <Header />
        <div className="error-message">
          {errorType === "NOT_FOUND" && (
            <>
              <h2>Course Not Found</h2>
              <p>The course you're looking for doesn't exist or has been removed.</p>
            </>
          )}
          {errorType === "INVALID_ID" && (
            <>
              <h2>Invalid Course URL</h2>
              <p>The URL seems to be incorrect. Please check and try again.</p>
            </>
          )}
          {errorType === "NETWORK" && (
            <>
              <h2>Connection Error</h2>
              <p>Unable to load the course. Please check your internet connection.</p>
            </>
          )}
          <p className="countdown-text">Redirecting to home in {countdown} seconds...</p>
          <button onClick={() => navigate("/")}>Go Home Now</button>
        </div>
      </PageLayout>
    );
  }

  const handleEnroll = async () => {
    try {
      if (!course) return;
      setEnrollmsg(null);
      setEnroll(true);
      const token = localStorage.getItem("token");
      if (!token) {
        openAuthModal("login");
        return;
      }
      await courseAPI.enrollCourse(course.id, token);
      setEnrollmsg("Thank you for enrolled the course.");
    } catch (error) {
      // Handle session expired - open login modal
      if (error instanceof Error && error.message === "SESSION_EXPIRED") {
        openAuthModal("login");
        return;
      }
      console.error("enroll failed:", error);
      if (error instanceof Error) {
        setEnrollmsg(error.message);
      } else {
        setEnrollmsg("enroll failed");
      }
    } finally {
      setEnroll(false);
    }
  };

  // no course - this case is now handled by the error state above
  if (!course) {
    return (
      <PageLayout>
        <Header />
        <div className="error-message">
          <h2>Course Not Found</h2>
          <p>The course you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </PageLayout>
    );
  }

  // Compute prev/next courses ID loop 
  const currentIndex = allCourses.findIndex((c) => c.id === course.id);
  const prevCourse =
    allCourses.length > 1
      ? allCourses[currentIndex === 0 ? allCourses.length - 1 : currentIndex - 1]
      : null;
  const nextCourse =
    allCourses.length > 1
      ? allCourses[currentIndex === allCourses.length - 1 ? 0 : currentIndex + 1]
      : null;

  return (
    <PageLayout>
      <Header />
      {/* display course content */}
      <div className="image-wrapper">
        {!imageLoaded && <div className="image-skeleton" />}
        <OptimizedImage
          src={course.image_url ?? "/images/tea-intro.png"}
          alt={course.title}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      </div>
      <div className="textcontainer">
        <h1 className="coursetitle">{course.title}</h1>
        <p className="courseintro">{course.description}</p>
        <p className="course-price">Price: NT$ {course.price}</p>
        <br />
        <button
          className="register-button"
          onClick={handleEnroll}
          disabled={enroll}
        >
          {" "}
          {enroll ? "Registering..." : "Register the course"}
        </button>
        {enrollmsg && <p className="enroll-message">{enrollmsg}</p>}
      </div>

      {/* Prev / Next course navigation */}
      {allCourses.length > 1 && (
        <div className="course-nav">
          {prevCourse && (
            <button
              className="course-nav-btn course-nav-prev"
              onClick={() => navigate(`/coursecontent/${courseSlug(prevCourse.id, prevCourse.title)}`)}
            >
              <span className="course-nav-arrow">&larr;</span>
              <span className="course-nav-label">
                <span className="course-nav-hint">Previous</span>
                <span className="course-nav-title">{prevCourse.title}</span>
              </span>
            </button>
          )}
          {nextCourse && (
            <button
              className="course-nav-btn course-nav-next"
              onClick={() => navigate(`/coursecontent/${courseSlug(nextCourse.id, nextCourse.title)}`)}
            >
              <span className="course-nav-label">
                <span className="course-nav-hint">Next</span>
                <span className="course-nav-title">{nextCourse.title}</span>
              </span>
              <span className="course-nav-arrow">&rarr;</span>
            </button>
          )}
        </div>
      )}
    </PageLayout>
  );
}
