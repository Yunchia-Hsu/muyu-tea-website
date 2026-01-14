import "../styles/global.css";
import "../components/Header.css";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import "./Register.css";
import Header from "../components/Header";
import {authAPI} from "../services/api";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

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
      setError("Pease fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try{
      setLoading(true);
      const res = await authAPI.login({
        email,
        password,
      })
      console.log("login success:", res);

      // 儲存 token 和用戶資訊
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      navigate("/");
    }catch(error){
      console.error("login failed:", error);
      // 顯示錯誤訊息給用戶
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("failed to login");
      }
    } finally {
      setLoading(false);
    }
  }
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

          <h2>Please log in!</h2>

          {/* 錯誤訊息 */}
          <ErrorMessage message={error} onClose={() => setError(null)} />

          <div className="input-group">
            <input
            type="email"
            placeholder="Email"
            value= {email}
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
            onChange={(e)=> {
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
