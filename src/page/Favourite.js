import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
const Favourite = () => {
  const favList = useSelector((state) => state.Fav.favourite);

  const navigate = useNavigate();
  const Token = useSelector((state) => state.Auth.User);

  useEffect(() => {
    if (!Token) {
      navigate("/Signin");
    }
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        {favList.length > 0 ? (
          favList.map((user) => {
            return <UserCard key={user.id} user={user} remove={true} />;
          })
        ) : (
          <div className="h3 mt-5 text-center text-primary">
            You haven't favourite users
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
