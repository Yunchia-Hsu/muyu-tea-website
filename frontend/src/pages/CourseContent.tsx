import PageLayout from "../layouts/PageLayout";
import "../styles/global.css";
import "../components/Header.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { courseAPI } from "../services/api";
import Header from "../components/Header";
import OptimizedImage from "../components/OptimizedImage";
import "./CourseContent.css";
import type { Course } from "../services/api";

// Error types for better UX
type ErrorType = "NOT_FOUND" | "NETWORK" | "INVALID_ID" | null;

export default function Coursecontent() {
  const { id } = useParams<{ id: string }>(); // get course id from url
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
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

  useEffect(() => {
    async function fetchCourse() {
      // Validate ID format
      if (!id || isNaN(Number(id))) {
        setError("Invalid course ID");
        setErrorType("INVALID_ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await courseAPI.getCourse(Number(id));

        if (!data) {
          setError("Course not found");
          setErrorType("NOT_FOUND");
          return;
        }

        setCourse(data);
      } catch (err) {
        // Handle session expired - redirect to login
        if (err instanceof Error && err.message === "SESSION_EXPIRED") {
          navigate("/login");
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
        navigate("/login");
        return;
      }
      await courseAPI.enrollCourse(course.id, token);
      setEnrollmsg("Thank you for enrolled the course.");
    } catch (error) {
      // Handle session expired - redirect to login
      if (error instanceof Error && error.message === "SESSION_EXPIRED") {
        navigate("/login");
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
    </PageLayout>
  );
}
