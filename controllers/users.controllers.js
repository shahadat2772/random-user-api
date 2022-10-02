const fs = require("fs");

module.exports.getRandomUser = (req, res, next) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    } else {
      users = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];
      res.status(200).send({
        success: true,
        message: "Success",
        data: randomUser,
      });
    }
  });
};

module.exports.getAllUsers = (req, res, next) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    } else {
      users = JSON.parse(data);
      const limit = req.query.limit;
      const limitedUsers = users.splice(0, Number(limit));
      res.status(200).send({
        success: true,
        message: "Success",
        data: limitedUsers,
      });
    }
  });
};
