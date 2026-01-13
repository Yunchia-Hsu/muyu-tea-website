
import "../styles/global.css";
import "../components/Header.css";
import {useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import "./Register.css";
import Header from "../components/Header";
import { useState } from "react";
import { authAPI } from "../services/api";
import ErrorMessage from "../components/ErrorMessage";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // 清除之前的錯誤
    setError(null);

    // 前端驗證
    if (!username || !email || !password || !confirmpassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try{
      setLoading(true);
      const res = await authAPI.register({
        username,
        email,
        password,
        confirmpassword,
      })
      console.log("register success:", res);

      // 註冊成功，導向登入頁
      navigate("/login");
    }catch(error){
      console.error("register failed:", error);
      // 顯示錯誤訊息給用戶
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Register failed, please try again");
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
          {/* 關閉按鈕 */}
          <button
            className="close-button"
            onClick={() => navigate("/")}
            aria-label="Close"
          >
            ✕
          </button>

          <h2>Please sign up!</h2>

          {/* 錯誤訊息 */}
          <ErrorMessage message={error} onClose={() => setError(null)} />

          <div className="input-group">
            <input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
            disabled={loading}
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            disabled={loading}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            disabled={loading}
            />
            <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
              setError(null);
            }}
            disabled={loading}
            />
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "SUBMIT"}
            </button>
          </div>
          <div className="action-button">
            <h3>Already have an account?</h3>

            <button
              className="action-button-login"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>

            <div />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
