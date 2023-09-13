import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const username = useRef();
  const password = useRef();
  const confirmPs = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    if (username.current.value.length < 7) {
      setError("Username must be at least 7 characters in length");
    } else if (password.current.value.length < 7) {
      setError("Password must be at least 7 characters in length");
    } else if (password.current.value !== confirmPs.current.value) {
      setError("passwords do not match");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
      };
      await fetch("https://elibrary-livid.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      navigate("/");
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
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            ref={confirmPs}
            placeholder="Confirm Password"
            className="formInput"
          />
        </div>

        <div className="row">
          <button type="button" className="signupBtn" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
        <div className="row">
          <p className="register">
            Already have an account ?{" "}
            <Link className="authLink" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
