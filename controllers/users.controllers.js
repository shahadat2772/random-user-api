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

module.exports.saveUser = (req, res, next) => {
  const user = req.body;
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    } else {
      const users = JSON.parse(data);
      const newUser = { ...user, id: users.length + 1 };
      users.push(newUser);
      fs.writeFile("./users.json", JSON.stringify(users), (err) => {
        if (err) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error" });
        } else {
          res.send({ success: true, message: "New user added successfully" });
        }
      });
    }
  });
};
