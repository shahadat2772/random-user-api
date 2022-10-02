const fs = require("fs");

let users;
fs.readFile("./users.json", (err, data) => {
  users = JSON.parse(data);
});

module.exports.getRandomUser = (req, res, next) => {
  const randomIndex = Math.ceil(Math.random() * users.length);
  const randomUser = users[randomIndex];
  res.status(200).send({
    success: true,
    message: "Success",
    data: randomUser,
  });
};
