import "../styles/global.css";
import "../components/Header.css";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import "./Register.css";
import Header from "../components/Header";
import { authAPI } from "../services/api";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

//email validation check
function isValidEmail(email: string): boolean {
  const parts = email.split("@");
  const [local, domain] = parts;

  // 3. @ must contain sth before @
  if (local.length === 0) return false;

  //  @ must contain.
  const domainParts = domain.split(".");
  if (domainParts.length < 2) return false;

  //  . ...@...
  if (domainParts.some((part) => part.length === 0)) return false;

  return true;
}

function validateEmail(email: string): { valid: boolean; error?: string } {
  // Check for empty
  if (!email.trim()) {
    return { valid: false, error: "Email cannot be empty" };
  }
  // Check for spaces
  if (email.includes(" ")) {
    return { valid: false, error: "Email cannot contain spaces" };
  }
  // Check for multiple @ symbols
  const atSymbolCount = (email.match(/@/g) || []).length; // find /@/  global
  if (atSymbolCount !== 1) {
    return { valid: false, error: "Email must contain exactly one '@' symbol" };
  }
  // Check basic email format: something@something.something
  if (!isValidEmail(email)) {
    return { valid: false, error: "Email format is invalid" };
  }
  return { valid: true };
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // clean the former error message
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.error || "Invalid email");
      return;
    }

    try {
      setLoading(true);
      const res = await authAPI.login({
        email,
        password,
      });
      console.log("login success:", res);

      // save token and user info to local storage
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      navigate("/");
    } catch (error) {
      console.error("login failed:", error);
      // display error message to user
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("failed to login");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageLayout>
      <Header />
      <div className="login-wrapper">
        <div className="login-panel">
          {/* close button*/}
          <button
            className="close-button"
            onClick={() => navigate("/")}
            aria-label="Close"
          >
            ✕
          </button>

          <h2>Please log in!</h2>

          <ErrorMessage message={error} onClose={() => setError(null)} />

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null); // 清除錯誤當用戶開始輸入
              }}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null); // 清除錯誤當用戶開始輸入
              }}
              disabled={loading}
            />

            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "登入中..." : "SUBMIT"}
            </button>
          </div>
          <div className="action-button">
            {/* <button className="action-button-signup">Sign up</button>  */}
            <h3>Want to sign up?</h3>
            <button
              className="action-button-login"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
            <div />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
