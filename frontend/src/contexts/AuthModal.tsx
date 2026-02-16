/* Modal container driven by AuthModalContext. */
import { useEffect } from "react";
import { useAuthModal } from "./AuthModalContext";
import "./AuthModal.css";
import { LoginForm } from "../components/Login";
import { Register } from "../components/Register";

export default function AuthModal() {
  const { mode, closeAuthModal, openAuthModal } = useAuthModal();
  // Allow ESC to close for accessibility.
  useEffect(() => {
    if (!mode) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);
  // Do not render when modal is closed.
  if (!mode) return null;

  return (
    <div
      className="auth-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Close only when clicking the overlay (not the panel).
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
