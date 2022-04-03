import "../../App.scss";
import "./Login.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/engage";
import type { LoginRequest } from "../../features/engage";
import { Layout } from "../../Components/LoginLayout";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = () => {
    const payload = {
      email,
      password,
    } as LoginRequest;
    login(payload)
      .unwrap()
      .then((e) => {
        navigate("/home");
      })
      .catch((err) => {
        setError(err.data.message);
      });
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePassChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Layout>
      <div className="viewHeader">
        <h1>Log In</h1>
      </div>
      {/* <form> */}
      <div>
        <div className="formElement">
          <label>
            Email:
            <input
              type="email"
              placeholder="Email"
              required
              onChange={handleEmailChange}
            />
          </label>
        </div>
        <div className="formElement">
          <label>
            Password:
            <input
              type="password"
              placeholder="Password"
              required
              onChange={handlePassChange}
            />
          </label>
        </div>
      </div>
      <div className="errorBox">
        <label>{error}</label>
      </div>
      <button className="buttonText" onClick={handleLogin}>
        Log In
      </button>
      {/* </form> */}
    </Layout>
  );
}

export default Login;
