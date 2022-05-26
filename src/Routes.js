import { Route, Routes, Navigate } from "react-router";
import { useSelector } from "react-redux";
import ROUTES from "./config/routes";
import {
  Dashboard,
  Search,
  Favourite,
  NotFound,
  SignIn,
  SignUp,
  User,
} from "./page";

function RoutesLib() {
  const Token = useSelector((state) => state.Auth.User);
  const isAuthentication = Token ? Token : false;

  return (
    <Routes>
      <Route path="/Signin" element={<SignIn />}></Route>
      <Route path="/SignUP" element={<SignUp />}></Route>
      <Route
        path="/"
        element={
          isAuthentication ? (
            <Navigate replace to="/Dashboard" />
          ) : (
            <Navigate replace to="/Signin" />
          )
        }
      ></Route>
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.SEARCH} element={<Search />} />
      <Route path={ROUTES.USER} element={<User />}></Route>
      <Route path={ROUTES.FAVOURITE} element={<Favourite />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesLib;
