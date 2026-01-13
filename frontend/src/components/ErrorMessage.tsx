import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string | null;
  onClose?: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{message}</span>
        {onClose && (
          <button className="error-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
