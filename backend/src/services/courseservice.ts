import { pool } from "../db";
import e from "express";
import { Course } from "../types/course";
import { Enrollment } from "../types/enrollment";
// mock DB
// const courses: Course[] = [
//   {
//     id: 1,
//     title: "Introduction to Tea",
//     description: "Learn the basics of tea culture",
//     price: 100,
//   },
//   {
//     id: 2,
//     title: "Advanced Tea Brewing",
//     description: "Master advanced tea brewing techniques",
//     price: 200,
//   },
//   {
//     id: 3,
//     title: "Tea Chemistry",
//     description: "Learn the science behind tea",
//     price: 1000,
//   },
// ];

export const getAllCourses = async (): Promise<Course[]> => {
  // In a real application, this would fetch data from a database
  //   在 service 檔案 import pool  SQL 導入資料
  const result = await pool.query(
    "SELECT id, title, description, price , image_url FROM courses ORDER BY id"
  );
  console.log(result);
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
  return acourse.rows[0]; // 返回單個課程物件，不是陣列
};

const enrollments: Enrollment[] = [];

export const enrollCourse = async (
  userId: number,
  courseId: number
): Promise<Enrollment> => {

  try {
    // Create new enrollment
    const enrollment = await pool.query(
      `INSERT INTO enrollments (user_id, course_id)
        VALUES ($1, $2)
        RETURNING id, user_id, course_id`,
      [userId, courseId]
    );
    return enrollment.rows[0];
  } catch (error:any) {
    if (error?.code === "23505") {
    
        if (error?.constraint === "enrollments_user_id_id_fkey") {
        throw new Error ("course not found");
        }
        if (error?.constraint === "enrollments_user_id_course_id_key") {
          throw new Error("You already enrolled this course");  
        }
    }
    throw error;
  }
};
