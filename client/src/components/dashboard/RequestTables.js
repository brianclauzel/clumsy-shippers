import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { userInfo } from "os";

export default props => {
  var divStyleFooter = {
    marginBottom: "200px"
  };
  return (
    <div className="table-responsive mb-4">
      <h4 className="mb-4">
        <u>{props.title}</u>
      </h4>
      <table className="table table-hover" style={divStyleFooter}>
        <thead>
          <tr>
            <th scope="col2">Votes</th>
            <th scope="col2">Date</th>
            <th scope="col2">Name</th>
            <th scope="col2">Department</th>
            <th scope="col2">Message</th>
            <th scope="col2">Comment</th>
            <th scope="col2">Read</th>
            <th className="col2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr key={props.key}>
            <td scope="col2">{props.votes}</td>
            <td scope="col2">
              <Moment format="YYYY/MM/DD">{props.date}</Moment>
            </td>
            <td scope="col2">{props.name}</td>
            <td scope="col2">{props.department}</td>
            <td scope="col2">{props.message}</td>
            <td scope="col2">{props.comment}</td>
            <td scope="col2">{props.read}</td>
            <td scope="col2">
              <button className="btn btn-primary-outline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
