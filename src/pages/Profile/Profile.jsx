import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  setIsFetching,
  setLoginFaiure,
  setUpdateAccount,
} from "../../state/slices/userSlice";
import { BASE_URL } from "../../utils/constants";
import "./Register.scss";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, token, state } = useSelector((state) => state.user);
  const [userdata, setUserdata] = useState({
    ...user,
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
      .put(`${BASE_URL}/user/update/${user._id}`, userdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        dispatch(setUpdateAccount(data));
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
      {!user && <Navigate to={"/login"} />}
      <div className="container">
        <fieldset>
          <legend>Profile</legend>
          <form onSubmit={(e) => submitForm(e)}>
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
                {state.isFetching ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Profile;
