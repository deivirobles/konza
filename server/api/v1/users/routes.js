const router = require("express").Router();

const controller = require("./controller");
const tasksRouter = require("./../tasks/routes.js");

/*
 * /api/tasks/     GET     GET ALL
 * /api/tasks/     POST    CREATE
 * /api/tasks/:id  GET     READ ONE
 * /api/tasks/:id  PUT     UPDATE
 * /api/tasks/:id  DELETE  DELETE
 */

router.param("id", controller.id);

router
  .route("/")
  .get(controller.all)
  .post(controller.create);

router
  .route("/:id")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.use("/:userId/task", tasksRouter);

module.exports = router;
