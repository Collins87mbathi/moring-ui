import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import "./NewBlog.scss";
const NewBlog = () => {
  const [serverErrors, setServerErrors] = useState([]);
  const [blogdata, setBlogData] = useState({
    title: "",
    body: "",
  });
  const handleChange = (e) => {
    setBlogData((initial) => {
      return { ...initial, [e.target.name]: e.target.value };
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/blog/new`, blogdata)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        alert("Blog successfully created");
      })
      .catch((err) => {
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
      <div className="container">
        <fieldset>
          <legend>Sign up</legend>
          <form onSubmit={(e) => submitForm(e)}>
            <div className="input__wrapper">
              <label htmlFor="email">Title</label>
              <input
                type="text"
                name="title"
                autoComplete="true"
                value={blogdata.title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="firstName">Body</label>
              <textarea
                name="body"
                id="body"
                cols="30"
                rows="10"
                value={blogdata.body}
              ></textarea>
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
              <button onClick={(e) => submitForm(e)}>Save</button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default NewBlog;
