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

// POST api/request/feedback
// posts request route
// private route
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
          user: req.user.id,
          name: req.user.name,
          email: req.user.email,
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

// GET api/requests/user
// Get current user info and requests
// Private route
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Requests.find({ name: req.user.name })
      .sort({ date: -1 })
      .then(request => {
        if (!request) {
          errors.norequests = "No current requests";
          return res.status(400).json(errors);
        }
        res.json(request);
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET api/requests/admin
// Get current admin info and all requests
// Private route
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Requests.find({})
      .then(request => {
        if (!request) {
          errors.norequests = "No current requests";
          return res.status(400).json(errors);
        }
        res.json(request);
      })
      .catch(err => res.status(404).json(err));
  }
);

// GET api/requests/
// Get current requests except private
// Private route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Requests.find({})
      .sort({ votes: -1 })
      .then(request => {
        if (!request) {
          errors.norequests = "No current requests";
          return res.status(400).json(errors);
        }
        res.json(request);
      })
      .catch(err => res.status(404).json(err));
  }
);

// POST api/requests/comment
// Post admin comment to a specific request
// Private route
router.post(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const comment = req.body.comment;
    const message = req.body.message;

    Requests.findOneAndUpdate(
      { message: message },
      { comment: comment },
      { new: true }
    )
      .then(request => {
        if (!request) {
          errors.comment = "No comment";
          return res.status(400).json(errors);
        }
        res.json(request);
      })
      .catch(err => res.status(404).json(err));
  }
);

// POST api/requests/upvote
// Post upvote to specific request
// Private route
router.post(
  "/upvote",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const message = req.body.message;
    const upvote = +1;

    Requests.findOneAndUpdate({ id: id }, { $inc: { votes: 1 } }, { new: true })
      .then(request => {
        if (!request) {
          errors.upvote = "No upvote";
          return res.status(400).json(errors);
        }
        res.json(request);
      })
      .catch(err => res.status(404).json(err));
  }
);

// POST api/requests/read
// Post to show that a message has been read
// Private route
router.post(
  "/read",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const message = req.body.message;
    const read = true;

    Requests.findOneAndUpdate(
      { message: message },
      { read: read },
      { new: true }
    )
      .then(request => {
        if (!request) {
          errors.upvote = "No upvote";
          return res.status(400).json(errors);
        }
        res.json(request);
      })
      .catch(err => res.status(404).json(err));
  }
);

// DELETE api/requests/:id
// DELETE specific user requests
// Private route
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Requests.findOne({ user: req.user.id }).then(request => {
      Request.findById(req.params.id)
        .then(req => {
          // Check for request owner
          if (req.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "User Not Authorized"
            });
          }
          Requests.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

module.exports = router;
