// API fetch
export interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  image_url?: string;
}

export interface LoginResponse {
  token: string;
  user: { id: number; email: string; username: string };
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}

export const courseAPI = {
  getAllCourses: () => fetcher<Course[]>("/courses"),

  getCourse: (id: number) => fetcher<Course>(`/courses/${id}`),

  enrollCourse: (courseId: number, token: string) =>
    fetcher(`/courses/${courseId}/enroll`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};


export const authAPI = {

  register: (data: {
    email: string;
    username: string;
    password: string;
    confirmpassword: string;
  }) =>
    fetcher("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    fetcher<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

};
