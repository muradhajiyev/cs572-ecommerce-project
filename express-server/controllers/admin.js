const User = require("../models/user");

// Handle Approve Seller
exports.approveSeller = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      user.status = "Active";
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send({ message: "user not found" });
    });
};

// Handle Reject Seller
exports.rejectSeller = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      user.status = "Reject";
      res.send(user);
    })
    .catch((err) => {
      res.status(404).send({ message: "user not found" });
    });
};
