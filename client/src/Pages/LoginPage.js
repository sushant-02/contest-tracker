import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// API & Utils
import intiAPI from "../Api/intiAPI";
import { users } from "../Utils/Users";

// CSS
import styles from "./LoginPage.module.css";

const LoginPage = ({ setLoginUser }) => {
  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await intiAPI.post("/user/signin", { username: user });
      setLoginUser(res.data.user);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.errors);
      setErrMsg(error.response.data.errors.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${styles.loginContainer} d-flex justify-content-center align-items-center`}
    >
      <div className={styles.customCard}>
        <form onSubmit={onLoginSubmit}>
          <h2 className={styles.title}> Log in</h2>
          <p className={styles.line}></p>
          <div className={styles.usernameLogin}>
            <label>
              <b>Username</b>
            </label>
            <select
              className="form-select mb-3"
              aria-label="Select Username"
              required
              onChange={(e) => {
                setUser(e.target.value);
              }}
              defaultValue={""}
            >
              <option value="" disabled="disabled">
                Select a user
              </option>
              {users.map((user, idx) => {
                return (
                  <option key={idx} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          {!isLoading ? (
            <button
              type="submit"
              className={`${styles.loginBtn} btn btn-primary`}
            >
              Continue
            </button>
          ) : (
            <button
              className={`${styles.loginBtn} btn btn-primary`}
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Loading...</span>
            </button>
          )}
        </form>
        <p className="text-center text-danger">{errMsg}</p>
      </div>
    </div>
  );
};

export default LoginPage;
