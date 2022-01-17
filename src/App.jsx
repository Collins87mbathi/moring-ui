import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import NewBlog from "./pages/NewBlog/NewBlog";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import UpdateBlog from "./pages/UpdateBlog/UpdateBlog";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/blog/new" element={<NewBlog />} />
        <Route path="/blog/update/:blogId" element={<UpdateBlog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
