import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card profile-card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="btn btn-success active" to="/profile/update">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card profile-card-2">
        <h3 className="card-header"> Your Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Name:</b>
            {name}
          </li>
          <li className="list-group-item">
            <b>Email:</b>
            {email}
          </li>
          <li className="list-group-item">
            <b>Role:</b>
            {role === 1 ? "Admin" : "Customer Account"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="container-fluid signup ">
      <div className="row ">
        <div className="col-md-4 col-sm-12 ">{userInfo()}</div>
        <div className="col-md-4 col-sm-12">
          <p>{userLinks()}</p>
        </div>
        <div className="col-md-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default Dashboard;
