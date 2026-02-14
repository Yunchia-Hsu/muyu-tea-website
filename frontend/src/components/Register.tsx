import "../styles/global.css";
import "./Register.css";
import { useState } from "react";
import { authAPI } from "../services/api";
import ErrorMessage from "./ErrorMessage";
import { validateEmail } from "../utils/emailValidation";

function validateRegisterInputs(
  username: string,
  email: string,
  password: string,
  confirmpassword: string
): string | null {
  if (!username || !email || !password || !confirmpassword) {
    return "Please fill in all fields";
  }
  const emailValidation = validateEmail(email);
  if (!emailValidation.valid) {
    return emailValidation.error || "Invalid email";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (password !== confirmpassword) {
    return "Passwords do not match";
  }
  return null;
}

function buildRegisterPayload(
  username: string,
  email: string,
  password: string,
  confirmpassword: string
) {
  return { username, email, password, confirmpassword };
}

export function Register({
  onClose,
  onGoLogin,
}: {
  onClose: () => void;
  onGoLogin: () => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // clean previous error
    setError(null);

    const validationError = validateRegisterInputs(
      username,
      email,
      password,
      confirmpassword
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await authAPI.register(
        buildRegisterPayload(username, email, password, confirmpassword)
      );
      console.log("register success:", res);
      // after registration navigate to login 
      onGoLogin();
    } catch (error) {
      console.error("register failed:", error);
      
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
    <div className="login-wrapper">
      <div className="login-panel">
        {/* close button*/}
        <button className="close-button" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2>Please sign up!</h2>

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
            onClick={onGoLogin}
            type="button"
          >
            Log in
          </button>

          <div />
        </div>
      </div>
    </div>
  );
}
