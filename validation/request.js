const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRequestInput(data) {
  let errors = {};

  data.department = !isEmpty(data.department) ? data.department : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.message, { min: 10, max: 300 })) {
    errors.message = "Message must be between 10 and 150";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
