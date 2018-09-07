const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Check input validation
const validateRequestInput = require("../../validation/request");

// Request model
const Request = require("../../models/Request");

// GET api/request/test
// Tests request route
// public route
router.get("/test", (req, res) => res.send("request works"));

// GET api/request/feedback
// Tests request route
// public route
router.post(
  "/feedback",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRequestInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Requests.findOne({ message: req.body.message }).then(request => {
      if (request) {
        errors.message = "Message already exists";
        return res.status(400).json(errors);
      } else {
        const newRequest = new Requests({
          name: req.user.name,
          type: req.body.type,
          title: req.body.title,
          message: req.body.message,
          department: req.body.department
        });

        Requests.create(newRequest)
          .then(feedback => res.json(feedback))
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;
