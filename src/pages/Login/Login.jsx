import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  setIsFetching,
  setLoginFaiure,
  setLoginSuccess,
} from "../../state/slices/userSlice";
import { BASE_URL } from "../../utils/constants";
import "./Login.scss";
const Login = () => {
  const { user, state } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const [serverErrors, setServerErrors] = useState([]);
  const handleChange = (e) => {
    setUserdata((initial) => {
      return { ...initial, [e.target.name]: e.target.value };
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(setIsFetching());
    axios
      .post(BASE_URL + "/auth/login", userdata)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        dispatch(setLoginSuccess(data));
      })
      .catch((err) => {
        dispatch(setLoginFaiure());
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            setServerErrors([...err.response.data.message]);
            return;
          }
          setServerErrors([err.response.data.message]);
        }
      });
  };

  return (
    <div className="login__wrapper">
      {user !== null && <Navigate to={"/"} />}
      <div className="container">
        <fieldset>
          <legend>Sign in</legend>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="input__wrapper">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                value={userdata.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                required
                value={userdata.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {serverErrors.length > 0 && (
              <div>
                <ul style={{ color: "red", padding: "5px 10px" }}>
                  {serverErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="button__submit">
              <button
                onClick={(e) => submitForm(e)}
                disabled={state.isFetching ? true : false}
              >
                {state.isFetching ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
