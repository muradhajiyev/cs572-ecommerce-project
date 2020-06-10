const Admin = require("../models/admin");
const User = require("../models/user");

exports.approveSeller = (req, res, next) => {
  const id = req.params.id;
  res.send(`Approve ${id}`);
  next();
};

exports.rejectSeller = (req, res, next) => {
  const id = req.params.id;
  res.send(`Reject ${id}`);
  next();
};
