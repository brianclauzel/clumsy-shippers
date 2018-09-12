import React, { Component } from "react";
import Moment from "react-moment";

export default props => {
  return (
    <div className="table-responsive mb-4">
      <h4 className="mb-4">
        <u>{props.title}</u>
      </h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col2">Votes</th>
            <th scope="col2">Date</th>
            <th scope="col2">Name</th>
            <th scope="col2">Department</th>
            <th scope="col2">Message</th>
            <th scope="col2">comment</th>
            <th scope="col2">Read</th>
            <th className="col2">Upvote</th>
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
              <button
                value={props._id}
                className="btn btn-outline-primary"
                onClick={props.onClick}
              >
                Upvote
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
