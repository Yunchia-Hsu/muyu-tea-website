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
  user: { id: number; email: string; username: string }; //user object
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // assemble URL
  const url = `${API_BASE_URL}${endpoint}`;
  //send request
  const response = await fetch(url, {
    ...options,
    // set default headers
    headers: {
      "Content-Type": "application/json", // use JSON content type
      ...options?.headers,
    },
  });
  //check if it's JSON
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const data =
    response.status === 204
      ? null
      : isJson
      ? await response.json()
      : await response.text();

  if (!response.ok) {
      let errormessage;
      if (isJson && data && typeof data === "object" && "message" in data){
        errormessage = (data as any).message;
      } else if (typeof data === "string" && data) {
        errormessage = data;
      } else {
        errormessage = `API request failed ${response.status})`;
      }
    throw new Error(errormessage);
  }
  return data as T;
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

  me: (token: string) =>
    fetcher<{ id: number; email: string; username: string }>("auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  logout: (token: string) =>
    fetcher<{ message: string }>("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

