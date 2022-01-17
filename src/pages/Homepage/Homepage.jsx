import axios from "axios";
import { useEffect, useState } from "react";
import Homeblog from "../../components/Homeblog/Homeblog";
import { BASE_URL } from "../../utils/constants";
import "./Homepage.scss";

const Homepage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setBlogs([...data.blogs]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="homepage__wrapper">
      {blogs.length < 1 ? (
        <div>No blog posts currently</div>
      ) : (
        blogs.map((blog, index) => (
          <Homeblog
            key={index}
            title={blog.title}
            body={blog.body}
            likes={blog.likes}
          />
        ))
      )}
    </div>
  );
};

export default Homepage;
