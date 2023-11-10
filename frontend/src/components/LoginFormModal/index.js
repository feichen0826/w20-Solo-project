import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();

    return dispatch(login("demo@user.io", "password")).then(() => {
      closeModal();
      // history.push("/");
    });
  };

  const isButtonDisabled = credential.length < 4 || password.length < 6;

  return (
    <div className="login-form-container">
     <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group3">
          <div className="password">Username or Email</div>
          <input
            type="text"
            id="credential"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="form-group3">
          <div className="password">Password</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-password"
            required
          />
        </div>
        {errors.credential && (
          <p className="error-message">{errors.credential}</p>
        )}
        <button type="submit" className="submit-button" disabled={isButtonDisabled}>
          Log In
        </button>
      </form>
      <button className="demo-login-button" onClick={handleDemoUser}>
        Log in as Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
