import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getRequests } from "../../actions/requestActions";
import axios from "axios";
import RequestItems from "./RequestItems";

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      id: ""
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getRequests();

    axios.get("/api/requests/").then(res => {
      this.setState({ requests: res.data });
      console.log(res.data);
    });
  }

  onChange(e) {
    this.setState({ [e.target.value]: e.target.value });
  }

  onClick(e) {
    this.setState({ id: this.state.id });
    axios.post("/api/requests/upvote", this.state.id).then(res => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="requests">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">H.R. Messages</h1>
              <p className="lead text-center">
                Check and see what employess are saying!
              </p>
              {this.state.requests.map(message => (
                <RequestItems
                  key={message._id}
                  name={message.name}
                  comment={message.comment}
                  title={message.title}
                  message={message.message}
                  department={message.department}
                  read={message.read.toString()}
                  date={message.date}
                  votes={message.votes}
                  value={message._id}
                  onClick={message.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Requests.propTypes = {
  getRequests: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  request: state.request;
};

export default connect(
  mapStateToProps,
  { getRequests }
)(Requests);
