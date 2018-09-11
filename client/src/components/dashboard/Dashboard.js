import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentRequest } from "../../actions/requestActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentRequest();
  }

  render() {
    const { user } = this.props.auth;
    const { request, loading } = this.props.request;

    let dashboardContent;

    if (request === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has request data
      if (Object.keys(request).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/user/${user.id}`}>{user.name}</Link>
            </p>
          </div>
        );
      } else {
        // User is logged in but has no requests
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet added any requests.</p>
            <Link to="/create-request" className="btn btn-lg btn-info">
              Create Request
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentRequest }
)(Dashboard);
