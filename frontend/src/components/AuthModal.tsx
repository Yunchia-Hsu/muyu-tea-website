/*
接收 Context 的指令

真的把燈打開

把燈罩（黑背景）放好

按 ESC 會關

點背景會關

決定現在顯示 Login 還是 Register
*/
// src/components/AuthModal.tsx
import { useEffect } from "react";
import { useAuthModal } from "../contexts/AuthModalContext";
import "./AuthModal.css";
import {LoginForm} from "./Login";
import {Register} from "./Register"
//import {RegisterForm} from "./Register"
// function LoginForm({
//   onClose,
//   onGoRegister,
// }: {
//   onClose: () => void;
//   onGoRegister: () => void;
// }) {
//   // 先放「假表單」讓你測 modal 流程，下一步再搬你真正的 Login.tsx
//   return (
//     <div className="login-panel">
//       <button className="close-button" type="button" onClick={onClose}>
//         ×
//       </button>

//       <h2>Log in</h2>

//       <div className="input-group">
//         <label>Email</label>
//         <input placeholder="you@example.com" />
//       </div>

//       <div className="input-group">
//         <label>Password</label>
//         <input type="password" placeholder="••••••••" />
//       </div>

//       <button type="button" onClick={onClose} style={{ marginTop: 12 }}>
//         (Demo) Login success → Close
//       </button>

//       <div style={{ marginTop: 12 }}>
//         <button type="button" onClick={onGoRegister}>
//           Go to Register
//         </button>
//       </div>
//     </div>
//   );
// }

// function RegisterForm({
//   onGoLogin,
// }: {
//   onGoLogin: () => void;
// }) {
//   return (
//     <div className="login-panel">
//       <button className="close-button" type="button" onClick={onGoLogin}>
//         ×v 
//       </button>

//       <h2>Register</h2>

//       <div className="input-group">
//         <label>Email</label>
//         <input placeholder="you@example.com" />
//       </div>

//       <div className="input-group">
//         <label>Password</label>
//         <input type="password" placeholder="••••••••" />
//       </div>

//       <button type="button" onClick={onGoLogin} style={{ marginTop: 12 }}>
//         (Demo) Register success → Back to Login
//       </button>

//       <div style={{ marginTop: 12 }}>
//         <button type="button" onClick={onGoLogin}>
//           Back to Login
//         </button>
//       </div>
//     </div>
//   );
// }

export default function AuthModal() {
  const { mode, closeAuthModal, openAuthModal } = useAuthModal();

  // ESC 關閉
  useEffect(() => {
    if (!mode) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, closeAuthModal]);

  // mode === null：no render （no modal）
  if (!mode) return null;

  return (
    <div
      className="auth-modal-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // 點背景關閉：只有點到 overlay 本身才關
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="auth-modal-content">
        {mode === "login" ? (
          <LoginForm
            onClose={closeAuthModal}
            onGoRegister={() => openAuthModal("register")}
          />
        ) : (
          <Register 
          onClose={closeAuthModal}
          onGoLogin={() => openAuthModal("login")}
          />
        )}
      </div>
    </div>
  );
}
