import e from "express";
import { Course } from "../types/course";
import { Enrollment } from "../types/enrollment";
// mock DB
const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Tea",
    description: "Learn the basics of tea culture",
    price: 100,
  },
  {
    id: 2,
    title: "Advanced Tea Brewing",
    description: "Master advanced tea brewing techniques",
    price: 200,
  },
  {
    id: 3,
    title: "Tea Chemistry",
    description: "Learn the science behind tea",
    price: 1000,
  },
];

export const getAllCourses = async (): Promise<Course[]> => {
  // In a real application, this would fetch data from a database
  return courses;
};

export const getACourse = async (id: number): Promise<Course> => {
  const course = courses.find((c) => c.id === id);
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};


const enrollments: Enrollment[] = [];

export const enrollCourse = async(userId: number, courseId: number): Promise<Enrollment> => {
    // Check if course exists
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
        throw new Error("Course not found");
    }
    // Check if user is already enrolled
    const existingEnrollment = enrollments.find((e) => e.userId === userId && e.courseId === courseId);
    if (existingEnrollment) {
        throw new Error("User already enrolled in this course");
    }
    // Create new enrollment
    const enrollment: Enrollment = {userId, courseId};
    enrollments.push(enrollment);
    return enrollment;
};


