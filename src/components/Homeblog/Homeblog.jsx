import { ThumbUpAltOutlined } from "@mui/icons-material";
import "./Homeblog.scss";

const Homeblog = ({ title,body,likes }) => {
  const user = false;
  return (
    <div className="h__blog__wrapper">
      <div className="top">
        <div className="left">20/11/2020</div>
        <div className="right">
          <div className="author">Author</div>Mike Juma
        </div>
      </div>
      <div className="content">
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div className="body">
          <p>
            {body}
          </p>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="icon__wrapper">
            <div className="likes">
              <div className="count">{likes}</div> <ThumbUpAltOutlined />
              <div className="txt">Likes</div>
            </div>
          </div>
        </div>
        <div className="right">
          {!user && (
            <ul>
              <li>View</li>
            </ul>
          )}
          {user && (
            <ul>
              <li>Edit</li>
              <li>Delete</li>
              <li>Update</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homeblog;
