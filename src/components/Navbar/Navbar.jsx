import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../state/slices/userSlice";
import "./Navbar.scss";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <div className="nav__wrapper">
      <div className="left">
        <div className="logo">
          <img src="/logo192.png" alt="" className="logo" />
        </div>
        <Link to="/">Dev blog</Link>
      </div>
      <div className="right">
        {user ? (
          <ul>
            <li>
              <Link to="/profile">{user.username}</Link>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                dispatch(logout());
              }}
            >
              Logout
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
