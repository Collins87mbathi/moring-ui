import { useState } from "react";
import "./NewBlog.scss";
const NewBlog = () => {
  const [blogdata, setBlogData] = useState({
    title: "",
    body: "",
  });
  const handleChange = (e) => {
    setBlogData((initial) => {
      return { ...initial, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="login__wrapper">
      <div className="container">
        <fieldset>
          <legend>Sign up</legend>
          <form>
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

            <div className="button__submit">
              <button>Save</button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default NewBlog;
