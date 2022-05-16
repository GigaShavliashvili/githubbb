import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UserCard from "../components/UserCard";
const fetchData = (username) => {
  return axios({
    method: "GET",
    url: `https://api.github.com/users/${username}`,
    headers: {
      Authorization: `token ${process.env.REACT_APP_USER_TOKEN}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchRepositories = (username) => {
  return axios({
    method: "GET",
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `token ${process.env.REACT_APP_USER_TOKEN}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const User = () => {
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);

  const params = useParams();
  console.log(params);
  useEffect(() => {
    //fetch user main data
    fetchData(params.username)
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // fetch Repositories data
    fetchRepositories(params.username)
      .then((res) => {
        console.log(res);
        setRepos(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (user.length === 0 && repos.length === 0) {
    return <div>...Loading</div>;
  }

  return (
    <div className="container ">
      <div className="row">
        <UserCard user={user} profile={true} />
        <div className="p-2  col">
          <div className="row p-2 gap-3 justify-content-center">
            <p className="h5 mb-0 text-secondary">Top Repositors</p>
            {repos.slice(0, 9).map((repo) => {
              return (
                <div
                  className="card p-2 col-lg-3 shadow col-md-5 col-sm-7 "
                  style={{ minWidth: "16.5rem" }}
                  key={repo.id}
                >
                  <div
                    className="card-body p-1 "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="text-success mb-0 text-end">
                      {repo.visibility}
                    </p>
                    <h5 className="card-title fw-light mb-0 h6 text-primary">
                      {repo.full_name}
                    </h5>
                    <p className="text-secondary fw-light mb-0">
                      {typeof repo.description === "string"
                        ? repo.description.substring(0, 60)
                        : ""}
                      ...
                    </p>
                    <div className="row mt-1 text-center">
                      <div className="col text-secondary mb-0">
                        forks: <span className="text-danger">{repo.forks}</span>
                      </div>
                      <div className="col text-secondary">
                        watchers:{" "}
                        <span className="text-danger">{repo.watchers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
