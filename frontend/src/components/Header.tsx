import logo from "../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthModal } from "../contexts/AuthModalContext";

function Header() {
  const { openAuthModal } = useAuthModal();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  // Sync user state from localStorage and auth events.
  useEffect(() => {
    const readUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      } else {
        setUser(null);
      }
    };

    readUser();

    window.addEventListener("auth-changed", readUser);
    return () => window.removeEventListener("auth-changed", readUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  return (
    <header className="header">
      <img
        src={logo}
        alt="muyu tea logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <h3 className="page-link">
        {user ? (
          <div className="user-info">
            <span className="user-info">Welcome, {user.username}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <div>

          <button onClick={() => openAuthModal("login")}>Log in</button>
        </div>

        )}
        <Link to="/"> Home </Link>
      </h3>
    </header>
  );
}

export default Header;
