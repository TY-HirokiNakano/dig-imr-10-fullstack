const path = require("path");
const express = require("express");
const { initPace } = require("./src/pace");
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require("knex");

const paceRepository = initPace(knex);
console.log("paceRepository", paceRepository);

app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", async (req, res) => {
  res.send("Hello, World!");
});

app.get("/paces", async (req, res) => {
  res.send("id=1のデータ", paceRepository.findById(1));
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
