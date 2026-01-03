import logo from "../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img
        src={logo}
        alt="muyu tea logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <h3 className="page-link">
        <Link to="/login"> Log in </Link>{" "}
        <Link to="/coursecontent"> Expore Courses </Link>
      </h3>
    </header>
  );
}

export default Header;
