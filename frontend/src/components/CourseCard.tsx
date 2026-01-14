import "./CourseCard.css";

interface CourseCardProps {
  src: string;
  alt: string;
  size?: "small" | "large";
  zIndex?: number;
}

export default function CourseCard({
  src,
  alt,
  size = "small",
  zIndex = 1,
}: CourseCardProps) {
  return (
    <div
      className={`course-card ${
        size === "large" ? "course-card-large" : "course-card-small"
      }`}
      style={{ zIndex }}
    >
      <img src={src} alt={alt} />
    </div>
  );
}
