import { pool } from "../db";
import { Course } from "../types/course";
import { Enrollment } from "../types/enrollment";

export const getAllCourses = async (): Promise<Course[]> => {
  // Fetch all courses for the listing view.
  const result = await pool.query(
    "SELECT id, title, description, price , image_url FROM courses ORDER BY id"
  );
  return result.rows;
};

export const getACourse = async (id: number): Promise<Course> => {
  const acourse = await pool.query(
    "SELECT id, title, description, price, image_url FROM courses WHERE id=$1",
    [id]
  );
  if (!acourse.rows.length) {
    throw new Error("Course not found");
  }
  // Return a single course object instead of an array.
  return acourse.rows[0];
};

const enrollments: Enrollment[] = [];

export const enrollCourse = async (
  userId: number,
  courseId: number
): Promise<Enrollment> => {

  try {
    // Create new enrollment for the user and course.
    const enrollment = await pool.query(
      `INSERT INTO enrollments (user_id, course_id)
        VALUES ($1, $2)
        RETURNING id, user_id, course_id`,
      [userId, courseId]
    );
    return enrollment.rows[0];
  } catch (error: any) {
    if (error?.code === "23505") {
      if (error?.constraint === "enrollments_user_id_id_fkey") {
        throw new Error("course not found");
      }
      if (error?.constraint === "enrollments_user_id_course_id_key") {
        throw new Error("You already enrolled this course");
      }
    }
    throw error;
  }
};
