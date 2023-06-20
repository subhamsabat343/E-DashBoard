import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
        <img src={require('./images/images5.jpeg')} alt="logo" className="logo"/>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/update">Update product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          {/* <li>{auth ?<Link to="/signup" onClick={logout}>Logout</Link>: <Link to="/signup">SignUp</Link>}</li>
                <li><Link to="/login">LogIn</Link></li> */}
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
