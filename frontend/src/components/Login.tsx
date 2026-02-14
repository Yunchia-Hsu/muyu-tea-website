import "../styles/global.css";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { authAPI } from "../services/api";
import { validateEmail } from "../utils/emailValidation";
import "./Register.css";

function validateLoginInputs(email: string, password: string): string | null {
  if (!email || !password) {
    return "Please fill in all fields";
  }
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return emailValidation.error || "Invalid email";
  }
  return null;
}

function persistAuth(res: { token?: string; user?: unknown }) {
  if (res.token) localStorage.setItem("token", res.token);
  if (res.user) localStorage.setItem("user", JSON.stringify(res.user));
  window.dispatchEvent(new Event("auth-changed"));
}
export function LoginForm({
  onClose,
  onGoRegister,
}: {
  onClose: () => void;
  onGoRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    const validationError = validateLoginInputs(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await authAPI.login({ email, password });
      console.log("login success:", res);

      persistAuth(res);

      // close modal, stay at the same  context
      onClose();
    } catch (err) {
      console.error("login failed:", err);
      if (err instanceof Error) setError(err.message);
      else setError("failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-panel">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close"
          type="button"
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

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading ? "登入中..." : "SUBMIT"}
          </button>
        </div>

        <div className="action-button">
          <h3>Want to sign up?</h3>
          <button
            className="action-button-login"
            onClick={onGoRegister}
            type="button"
          >
            Sign up
          </button>
          <div />
        </div>
      </div>
    </div>
  );
}
