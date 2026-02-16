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

function clearToken() {
  localStorage.removeItem("token");
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// fetch response, parse to data,  catch errors
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  //send request
  const response = await fetch(url, {
    ...options,
    // set default headers
    headers: {
      "Content-Type": "application/json", // use JSON content type
      ...options?.headers, //can add up "Authorization": "Bearer xxx"
    },
  });
  //check if response is JSON
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  //Parse the response body into data
  let data: unknown;

  if (response.status === 204) {
    // 204 means "No Content", so we set data to null
    data = null;
  } else if (isJson) {
    // If the header says it's JSON, we parse the response body into an object
    data = await response.json(); //convert text to json
  } else {
    // Otherwise, we just read the response body as plain text
    data = await response.text();
  }
  //token timeout handling
  if (response.status === 401) {
    clearToken();
    // Redirect will be handled by the component that catches this error
    throw new Error("SESSION_EXPIRED");
  }
  //400/404/500
  if (!response.ok) {
    let errormessage;
    if (isJson && data && typeof data === "object" && "message" in data) {
      errormessage = (data as { message: string }).message;
    } else if (typeof data === "string" && data) {
      errormessage = data;
    } else {
      errormessage = `API request failed ${response.status}`;
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
};
