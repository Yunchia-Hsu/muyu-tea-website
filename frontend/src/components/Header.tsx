import logo from "../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );

  // get user info from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  // log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
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
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <Link to="/login">Log in</Link>
        )}
        <Link to="/"> Home </Link>
      </h3>
    </header>
  );
}

export default Header;
