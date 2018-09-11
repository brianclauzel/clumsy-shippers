import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createNewRequest } from "../../actions/requestActions";

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      message: "",
      department: "",
      private: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const requestData = {
      name: this.state.name,
      title: this.state.title,
      message: this.state.message,
      department: this.state.department,
      private: this.state.private
    };

    this.props.createNewRequest(requestData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for private, department, type
    const departmentOptions = [
      {
        label: "* Select department where feedback will be sent",
        value: 0
      },
      {
        label: "General",
        value: "General"
      },
      {
        label: "Diversity & Inclusion",
        value: "Diversity & Inclusion"
      },
      {
        label: "Employee Relations",
        value: "Employee Relations"
      },
      {
        label: "Labor Relations",
        value: "Labor Relations"
      },
      {
        label: "Talent Acquisition",
        value: "Talent Acquisition"
      },
      {
        label: "Organizational & Employee Development",
        value: "Organizational & Employee Development"
      },
      {
        label: "Technology",
        value: "Technology"
      }
    ];

    return (
      <div className="create-request">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mb-4">
                Create Your Request
              </h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  type="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  type="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="Give us brief description of your feedback or idea"
                />
                <SelectListGroup
                  placeholder="* Department"
                  name="department"
                  type="department"
                  value={this.state.department}
                  onChange={this.onChange}
                  options={departmentOptions}
                  error={errors.department}
                  info="Let us know which department of H.R. you would like this feedback to be sent to"
                />
                <TextAreaFieldGroup
                  placeholder="* Message"
                  name="message"
                  type="message"
                  value={this.state.message}
                  onChange={this.onChange}
                  error={errors.message}
                  info="Send us your ideas and feedback!"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateRequest.propTypes = {
  request: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  request: state.request,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNewRequest }
)(withRouter(CreateRequest));
