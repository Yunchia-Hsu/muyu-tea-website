// API 基礎配置
export interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  image_url?: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// 通用 fetch 函數
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

// 課程相關 API
export const courseAPI = {
  // 獲取所有課程
  getAllCourses: () => fetcher<Course[]>("/courses"),

  // 獲取單一課程
  getCourse: (id: number) => fetcher<Course>(`/courses/${id}`),

  // 報名課程
  enrollCourse: (courseId: number, token: string) =>
    fetcher(`/courses/${courseId}/enroll`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

// 認證相關 API
export const authAPI = {
  // 註冊
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

  // 登入
  login: (data: { email: string; password: string }) =>
    fetcher("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  //    // 獲取當前用戶
  //    getMe: (token: string) =>
  //      fetcher('/auth/me', {
  //        headers: {
  //          'Authorization': `Bearer ${token}`,
  //        },
  //      }),
};
