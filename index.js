const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const todos = [];

app.get("/todos", (request, response) => {
  return response.status(200).json(todos);
});

app.get("/todos/:id", (request, response) => {
  const { id } = request.params;

  const todoFound = todos.find((todo) => todo.id === id);

  if (!todoFound) {
    return response.status(404).json({ message: "todo not found" });
  }

  return response.status(200).json(todoFound);
});

app.post("/todos", (request, response) => {
  const { body } = request;

  const todo = {
    id: uuid(),
    name: body.name,
    create_at: new Date(),
    updated_at: new Date(),
  };

  todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", (request, response) => {
  const { body, params } = request;
  const { id } = params;

  const todoToUpdateIndex = todos.findIndex((todo) => todo.id === id);

  if (todoToUpdateIndex < 0) {
    return response.status(404).json({ message: "todo not found" });
  }

  const updatedTodo = {
    ...todos[todoToUpdateIndex],
    name: body.name,
    updated_at: new Date(),
  };

  todos[todoToUpdateIndex] = updatedTodo;

  return response.status(200).json(todos[todoToUpdateIndex]);
});

app.delete("/todos/:id", (request, response) => {
  const { id } = request.params;

  const todoToUpdateIndex = todos.findIndex((todo) => todo.id === id);

  if (todoToUpdateIndex < 0) {
    return response.status(204).send();
  }

  todos.splice(todoToUpdateIndex, 1);

  return response.status(204).send();
});

app.listen("3000", () => {
  console.log("Server is running!");
});
