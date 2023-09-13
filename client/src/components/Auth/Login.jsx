import { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../AuthContext/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import "./Auth.css";

function Login() {
  const { dispatch, isLoading } = useContext(AuthContext);
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    if (username.current.value.length < 7) {
      setError("Username must be at least 7 characters in length");
    } else if (password.current.value.length < 7) {
      setError("Password must be at least 7 characters");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      dispatch({ type: "LOGIN" });

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      if (!data) {
        setError(
          "Your login credentials don't match an account in our system."
        );
      } else {
        navigate("/");
      }
    }
  };
  return (
    <div className="formContainer">
      <p className="error">{error}</p>
      <form className="form">
        <div className="row">
          <label htmlFor="">Username</label>
          <input
            type="text"
            ref={username}
            placeholder="Username"
            className="formInput"
          />
        </div>
        <div className="row">
          <label htmlFor="">Password</label>
          <input
            type="password"
            ref={password}
            placeholder="Password"
            className="formInput"
          />
        </div>
        <div className="row">
          <button
            type="button"
            className="loginBtn"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size="15px" />
            ) : (
              "Log In"
            )}
          </button>
        </div>
        <div className="row">
          <p className="register">
            Don't have an account ?{" "}
            <Link className="authLink" to="/signup">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
