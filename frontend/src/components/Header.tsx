import logo from "../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthModal } from "../contexts/AuthModalContext";

function getToken() {
  return localStorage.getItem("token");
}

function Header() {
  const { openAuthModal } = useAuthModal();
  const [token, setToken] = useState<string | null>(getToken());
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  // get user info from localStorage + re-read on auth changes
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
      setToken(getToken());
    };

    readUser();

    window.addEventListener("auth-changed", readUser);
    return () => window.removeEventListener("auth-changed", readUser);
  }, []);

  // log out
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

          {/* <Link to="/login">Log in</Link> */}
          <button onClick={() => openAuthModal("login")}>Log in</button>
          {/* <button onClick={() => openAuthModal("register")}>Register</button> */}
        </div>

        )}
        <Link to="/"> Home </Link>
      </h3>
    </header>
  );
}

export default Header;
