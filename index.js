const express = require("express");
const fs = require("fs");
const users = require("./users.json");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ status: " app running!!" });
});
app.get("/users", (req, res) => {
  const userHtml = `
  <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(userHtml);
});
// REST APIs
app.get("/api/v1/users", (req, res) => {
  res.json(users);
});
app.get("/api/v1/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

app.post("/api/v1/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./users.json", JSON.stringify(users), (error, data) => {
    res.json({ status: "create user success", id: users.length });
  });
});

app.put("/api/v1/users/:id", (req, res) => {
  res.json({ status: "update status pending" });
});

app.delete("/api/v1/users/:id", (req, res) => {
  res.json({ status: "delete status pending" });
});

app.listen(PORT, () => {
  console.log(`ping-pong on http://localhost:${PORT}`);
});
