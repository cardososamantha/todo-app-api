const express = require("express");
const todoController = require("./TodoController");

const router = express.Router();

router.get("/todos", todoController.list);

router.get("/todos/:id", todoController.findById);

router.post("/todos", todoController.create);

router.put("/todos/:id", todoController.update);

router.delete("/todos/:id", todoController.delete);

module.exports = router;
