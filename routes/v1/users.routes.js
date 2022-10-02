const express = require("express");
const userControllers = require("../../controllers/users.controllers");
const router = express.Router();

router
  /**
   * @api {get} / gets a random user
   * @apiDescription Get all the tools
   * @apiSuccess {success: true/false, message:"", data:{}}
   *
   * @apiErr {success:false, message: "Internal Error"}
   */
  .get("/random", userControllers.getRandomUser);

router
  /**
   * @api {get} / Get multiple users by limit
   * @apiDescription Get multiple users by limit
   *
   * @apiQueryParams {limit{1-}}
   *
   * @apiSuccess {success: true, message:"success", data:[]}
   *
   * @apiErr {success:false, message: "Internal Error"}
   */
  .get("/all", userControllers.getAllUsers);

module.exports = router;

router
  /**
   * @api {post}
   * @apiDescription Add a new user
   *
   * @apiBody  {"id": integer, "gender": "","name": "", "contact": "","address": "","photoUrl": ""}
   *
   * @apiSuccess {success: true, message:""}
   *
   * @apiErr {success:false, message: "Internal Error"}
   * @apiErr {
  "success": false,
  "message": "Required properties are missing in user info."
}
   */
  .post("/save", userControllers.saveUser);

router
  /**
   * @api {patch}
   * @apiDescription Update a user
   *
   * @apiBody  {id: integer, key: value}
   *
   * @apiSuccess {success: true, message: "Users info updated successfully"}
   *
   * @apiErr {success:false, message: "Internal Error"}
   * @apiErr {success:false, message: "Invalid user id"}
   */
  .patch("/update", userControllers.updateUser);

router
  /**
   * @api {patch}
   * @apiDescription Update multiple users info
   *
   * @apiBody  [{id: integer, key: value},{id: integer, key: value}, {id: integer, key: value}]
   *
   * @apiSuccess {success: true, message: "Users info updated successfully"}
   *
   * @apiErr {success:false, message: "Internal Error"}
   * @apiErr {success:false, message: "Invalid body input"}
   */
  .patch("/bulk-update", userControllers.bulkUpdate);

router
  /**
   * @api {delete}
   * @apiDescription Delete a user by id
   *
   * @apiBody  {id:integer}
   *
   * @apiSuccess {success: true, message: "Successfully updated users info."}
   *
   * @apiErr {success:false, message: "Internal Error"}
   * @apiErr {success:false, message: "Invalid body input"}
   */
  .delete("/delete", userControllers.deleteUser);

module.exports = router;

/**
 * @api {post} / tools save a tool
 * @apiDescription Get all the tools
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization User's access token
 *
 * @apiParam {Number{1-}}     [page=1]       List page
 * @apiParam {Number{1-100}}     [page=10]     Users per page
 *
 * @apiSuccess {Object[]} all the tools
 *
 * @apiErr {Unauthorized 401} Unauthorized Only authenticated users can access the data
 * @apiErr {Forbidden 403} Forbidden ONlye admins can access the data
 */
