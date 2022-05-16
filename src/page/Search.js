import React, { useState } from "react";
import axios from "axios";
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

const fetchData = (keyWord, amoutOfUsers) => {
  return axios({
    method: "GET",
    url: `https://api.github.com/search/users?q=${keyWord}&per_page=40&&page=${amoutOfUsers}`,
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
const Search = () => {
  const [users, setUsers] = useState([]);
  const [amoutOfUsers, SetAmoutOfUsers] = useState(1);
  const [loading, setloading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([]);
    setloading(true);
    setNoUser(false);
    const keyWord = e.target[0].value;
    fetchData(keyWord, amoutOfUsers).then((res) => {
      if (res.data.items.length === 0) {
        setNoUser(true);
        setloading(false);
      }
      res.data.items.forEach((user) => {
        userInfo(user).then((res) => {
          setUsers((prev) => {
            setloading(false);
            return [...prev, res];
          });
        });
      });
    });
  };

  return (
    <div className="container ">
      <div className=" mt-4">
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group justify-content-center">
            <div className="form-outline">
              <input
                type="search"
                placeholder="Search..."
                id="form1"
                className="form-control "
                style={{ width: "20rem" }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="m-3">
        <p>Search Result: {users.length > 0 ? users.length : "0 user"}</p>
        <div className="row">
          {!loading && !noUser ? (
            users.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })
          ) : (
            <div className="text-center mt-3 h4 text-danger">
              {noUser && !loading ? "user dont exist" : "...Loading"}
            </div>
          )}
        </div>
        <div className="text-center mt-3 ">
          {users.length === 40 ? (
            <button
              type="button"
              className="btn bg-primary text-white"
              onClick={() => {
                SetAmoutOfUsers((prev) => prev + 1);
              }}
            >
              See more
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
