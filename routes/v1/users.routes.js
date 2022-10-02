const express = require("express");
const userControllers = require("../../controllers/users.controllers");
const router = express.Router();

router
  /**
   * @api {get} / gets a random user
   * @apiDescription Get all the tools
   * @apiSuccess {success: true/false, message:"", data:{}}
   */
  .get("/random", userControllers.getRandomUser);

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
