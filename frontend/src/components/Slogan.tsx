import "./Slogan.css";
import { useNavigate } from "react-router-dom";

function Slogan() {
  const navigate = useNavigate();
  return (
    <section className="slogan">
      <h1 className="slogan-title">Muyu Tea Studio</h1>
      <h3 className="slogan-subtitle">
        Design your life with tea and pieceful mind.
      </h3>
      <button
        className="slogan-button"
        onClick={() => navigate("/teaintro")}
      >
        Explore Tea
      </button>
    </section>
  );
}

export default Slogan;
