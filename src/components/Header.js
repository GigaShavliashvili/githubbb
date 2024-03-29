import React from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/action";
import ROUTES from "../config/routes";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.Auth.User);

  return (
    <header className="shadow">
      <h1 className="text-white d-inline-flex p-1 bg-primary p-0 m-0 h3">
        {pathname.slice(1)} Page
      </h1>
      <div className=" m-2 ps-5 pe-5 pb-1 row">
        <div className="logo col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </div>

        <nav className="col ">
          <ul className="d-flex justify-content-end align-items-center">
            <li className="ms-2 me-2">
              <NavLink
                to={ROUTES.DASHBOARD}
                className={({ isActive }) => (isActive ? "active-item" : null)}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="ms-2 me-2">
              <NavLink
                to={ROUTES.SEARCH}
                className={({ isActive }) => (isActive ? "active-item" : null)}
              >
                Search
              </NavLink>
            </li>
            <li className="ms-2 me-2">
              <NavLink
                to={ROUTES.FAVOURITE}
                className={({ isActive }) => (isActive ? "active-item" : null)}
              >
                Favourite
              </NavLink>
            </li>
            <li className="ms-2 me-2">
              {Token ? (
                <button
                  className="btn bg-primary text-white"
                  onClick={() => {
                    dispatch(logOut());
                    window.location.reload();
                  }}
                >
                  Log Out
                </button>
              ) : (
                <Link to={"/Signin"}>
                  <button className="btn bg-primary text-white">Sign in</button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
