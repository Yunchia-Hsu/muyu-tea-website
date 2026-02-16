/*update  modal and broadcast to global */
import { useEffect } from "react";
import { useAuthModal } from "./AuthModalContext";
import "./AuthModal.css";
import { LoginForm } from "../components/Login";
import { Register } from "../components/Register";

export default function AuthModal() {
  const { mode, closeAuthModal, openAuthModal } = useAuthModal();
  // ESC close modal
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
      onClick={(e) => {
        // click dark area to close the modal
        if (e.target === e.currentTarget) closeAuthModal(); //target is where you click
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
