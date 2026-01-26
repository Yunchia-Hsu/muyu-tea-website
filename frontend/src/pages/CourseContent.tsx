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

export default function Coursecontent() {
  const { id } = useParams<{ id: string }>(); // get course id from url
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enroll, setEnroll] = useState(false);
  const [enrollmsg, setEnrollmsg] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        // Handle session expired - redirect to login
        if (err instanceof Error && err.message === "SESSION_EXPIRED") {
          navigate("/login");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch course");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

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
          <p>Error: {error}</p>
          <button onClick={() => navigate("/")}>go home</button>
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

  // no course
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
