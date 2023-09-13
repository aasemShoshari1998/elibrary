import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../AuthContext/AuthContext";
import "./Header.css";
import { useContext } from "react";

function Header() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLoginLogout = (e) => {
    e.preventDefault();
    if (e.target.textContent === "LOGIN") {
      navigate("/login");
    } else {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }
  };
  return (
    <header className="header">
      <nav className="navContainer">
        <ul className="nav">
          <Link to="/" className="navItem">
            HOME
          </Link>
          {user ? (
            <Link to="/shopping_cart" className="navItem">
              CART
            </Link>
          ) : null}

          <Link to="/login" className="navItem" onClick={handleLoginLogout}>
            {user ? "LOGOUT" : "LOGIN"}
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
