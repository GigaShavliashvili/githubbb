import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToFav, removeUser } from "../redux/action";
import { useDispatch } from "react-redux";
const fetchOrgnization = (url) => {
  return axios({
    method: "GET",
    url: url,
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

const UserCard = ({ user, profile, remove }) => {
  const [organization, setOrganization] = useState([]);
  /*   const [active, setActive] = useState(false); */

  const Active = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (profile) {
      fetchOrgnization(user.organizations_url).then((res) => {
        setOrganization(res.data);
      });
    }
  }, [profile]);

  return (
    <div key={user.id} className="p-2 col-lg-3 col-md-4 col-sm-6   fs">
      <div className="confrim shadow " ref={Active}>
        <div className="row gap-2 p-2 ">
          <p className="text-center text-secondary h5">
            do you really wanna {!remove ? "add" : "remove"}{" "}
            <span className="text-primary">{user.login}</span> in favourite
            list?
          </p>

          <button
            className="col btn bg-primary text-white"
            onClick={() => {
              if (!remove) {
                dispatch(addToFav(user));
              } else dispatch(removeUser(user.id));
              Active.current.classList.remove("active");
            }}
          >
            Confrim
          </button>
          <button
            className="col btn bg-primary text-white"
            onClick={() => {
              Active.current.classList.remove("active");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="card w-100 h-100 shadow">
        <img src={user.avatar_url} alt="" />
        <div className="card-body fs-7">
          <Link to={`/user/${user.login}`}>
            <h5 className=" h5 fw-light  text-primary">
              {user.login} <span className="text-muted fw-bold">/</span>{" "}
              {user.name}
            </h5>
          </Link>
          <p className="text-secondary fw-light  mb-0">
            Followers: {user.followers}
          </p>
          <p className="text-secondary fw-light mb-0">
            Following : {user.following}
          </p>
          <p className="text-secondary fw-light mb-0">
            Company : {user.company ? user.company : "Unknown"}
          </p>
          <p className="text-secondary fw-light  mb-0">
            Location : {user.location ? user.location : "Unknown"}
          </p>

          {profile ? (
            <div className="row">
              <p className=" text-secondary mt-2  mb-0">Organization</p>
              {organization !== 0 ? (
                organization.slice(0, 3).map((org) => {
                  return (
                    <div className="mt-0 col-2 mt-2" key={org.id}>
                      <div>
                        <a href={`https://github.com/${org.login}`}>
                          <img
                            style={{ width: "2rem" }}
                            src={org.avatar_url}
                            alt={org.login}
                          />
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="mt-1">Zero Organization</div>
              )}
              <p className=" text-secondary mt-2  mb-0">Github</p>
              <a href={`${user.html_url}`}>{user.html_url}</a>
            </div>
          ) : (
            ""
          )}
          {!remove ? (
            <button
              type="button"
              className="mt-2 btn btn-primary"
              onClick={() => {
                Active.current.classList.add("active");
              }}
            >
              Add to Fav
            </button>
          ) : (
            <button
              type="button"
              className="mt-2 btn btn-primary"
              onClick={() => {
                Active.current.classList.add("active");
              }}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
