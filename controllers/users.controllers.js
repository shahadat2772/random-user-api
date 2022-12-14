const fs = require("fs");
const { object, string, number } = require("yup");
// const { number } = require("yup/lib/locale");

let userSchema = object({
  id: number().required().positive().integer(),
  gender: string().required(),
  name: string().required(),
  contact: string().required(),
  address: string().required(),
  photoUrl: string().required(),
});

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
      const foundUsers = JSON.parse(data);
      const limit = req.query?.limit;
      let users;
      if (limit) {
        users = foundUsers.splice(0, Number(limit));
      } else {
        users = foundUsers;
      }
      res.status(200).send({
        success: true,
        message: "Success",
        data: users,
      });
    }
  });
};

module.exports.saveUser = async (req, res, next) => {
  const user = req.body;
  let parsedUser;
  try {
    parsedUser = await userSchema.validate(user);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Required properties are missing in user info.",
    });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    } else {
      const users = JSON.parse(data);
      const newUser = { ...parsedUser, id: users.length + 1 };
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

module.exports.updateUser = (req, res, next) => {
  const updatedInfo = req.body;
  const id = updatedInfo?.id;

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal server error." });
    } else {
      const users = JSON.parse(data);

      const targetUser = users.find((usr) => usr.id == id);
      if (!targetUser) {
        res.status(400).send({ success: false, message: "Invalid user id." });
        return;
      }

      let updatedUsers = [...users];
      users.forEach((user, index) => {
        if (user.id == id) {
          const updatedUser = Object.assign(user, updatedInfo);
          updatedUsers[index] = updatedUser;
        }
      });

      fs.writeFile("users.json", JSON.stringify(updatedUsers), (err) => {
        if (err) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error" });
        } else {
          res.status(200).send({
            success: true,
            message: "Users info updated successfully",
          });
        }
      });
    }
  });
};

module.exports.bulkUpdate = (req, res, next) => {
  const usersInfo = req.body;

  if (!usersInfo || !Array.isArray(usersInfo)) {
    res.status(400).send({ success: false, message: "Invalid body input." });
  } else {
    fs.readFile("./users.json", (err, data) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      } else {
        const users = JSON.parse(data);
        const updatedUsers = [...users];

        usersInfo.forEach((usr) => {
          users.forEach((user, index) => {
            if (usr.id == user.id) {
              const updatedUser = Object.assign(user, usr);
              updatedUsers[index] = updatedUser;
            }
          });
        });

        fs.writeFile("./users.json", JSON.stringify(updatedUsers), (err) => {
          if (err) {
            res
              .status(500)
              .send({ success: false, message: "Internal server error" });
          } else {
            res.status(200).send({
              success: true,
              message: "Successfully updated users info.",
            });
          }
        });
      }
    });
  }
};

module.exports.deleteUser = (req, res, next) => {
  const { id } = req.body;

  if (!id || isNaN(id)) {
    res.status(400).send({ success: false, message: "Invalid id user id." });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      res.status(500).send({ success: false, message: "" });
    } else {
      const users = JSON.parse(data);

      const targetUser = users.find((usr) => usr.id == id);
      if (!targetUser) {
        res
          .status(400)
          .send({ success: false, message: "Invalid id user id." });
        return;
      }
      const newUsers = users.filter((user) => user.id != id);

      fs.writeFile("./users.json", JSON.stringify(newUsers), (err) => {
        if (err) {
          res
            .status(500)
            .send({ success: false, message: "Internal server error." });
        } else {
          res
            .status(200)
            .send({ success: true, message: "Successfully deleted the user." });
        }
      });
    }
  });
};
