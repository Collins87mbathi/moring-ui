import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  setIsFetching,
  setLoginFaiure,
  setRegisterSuccess,
} from "../../state/slices/userSlice";
import { BASE_URL } from "../../utils/constants";
import "./Register.scss";
const Register = () => {
  const dispatch = useDispatch();
  const { user, state } = useSelector((state) => state.user);
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    confirmPassword: "",
  });
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
      .post(BASE_URL + "/auth/register", userdata)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        dispatch(setRegisterSuccess(data));
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
          <legend>Sign up</legend>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="input__wrapper">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                autoComplete="true"
                value={userdata.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                value={userdata.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                value={userdata.lastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={userdata.username}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="email"
                name="password"
                required
                value={userdata.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="email"
                name="confirmPassword"
                required
                value={userdata.confirmPassword}
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
              <button onClick={(e) => submitForm(e)}
              disabled={state.isFetching ? true : false}
              >
                {state.isFetching ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;
