import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
const userInfo = (user) => {
  return axios({
    method: "GET",
    url: `https://api.github.com/users/${user.login}`,
    headers: {
      Authorization: `token ${process.env.REACT_APP_USER_TOKEN}`,
    },
  })
    .then((res) => {
      /*  console.log(res.data); */

      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const fetchData = (amoutOfUsers) => {
  return axios({
    method: "GET",
    url: `https://api.github.com/search/users?q=followers:%3E=1000&per_page=20&page=${amoutOfUsers}`,
    headers: {
      Authorization: `token ${process.env.REACT_APP_USER_TOKEN}`,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const Dashboard = () => {
  const [amoutOfUsers, SetAmoutOfUsers] = useState(1);
  const [users, setUser] = useState([]);
  const navigate = useNavigate();
  const Token = useSelector((state) => state.Auth.User);

  useEffect(() => {
    if (!Token) {
      navigate("/Signin");
    }

    fetchData(amoutOfUsers).then((res) => {
      res.data.items.forEach((user) => {
        userInfo(user).then((res) => {
          setUser((prev) => {
            return [...prev, res];
          });
        });
      });
    });
  }, [amoutOfUsers]);

  if (users.length === 0) {
    return <div className="text-center mt-5 h4 text-danger">...Loading</div>;
  }
  return (
    <div className="container ">
      <div className="row ">
        {users.map((user, i) => {
          return <UserCard user={user} key={i} />;
        })}
      </div>
      <div className="text-center p-3">
        <button
          type="button"
          className="btn bg-primary text-white"
          onClick={() => {
            SetAmoutOfUsers((prev) => prev + 1);
            console.log(amoutOfUsers);
          }}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
