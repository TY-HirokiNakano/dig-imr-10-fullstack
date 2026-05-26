const path = require("path");
const express = require("express");
const { initPace } = require("./src/pace");
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require("./src/knex");

const paceRepository = initPace(knex);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());

// app.use("/api", async (req, res) => {
//   res.send("Hello, World!");
// });

// app.get("/api/paces", async (req, res) => {
app.get("/api/paces", async (req, res) => {
  const paceRecord = await paceRepository.findById(1);
  // res.send("id=1のデータ", paceRecord);
  res.json(paceRecord);
});

app.post("/api/paces", async (req, res) => {
  const { raceType, targetSeconds } = req.body;
  console.log("raceType:", raceType, "targetSeconds:", targetSeconds);
  const pace = await paceRepository.findByRaceTypeAndTarget(
    raceType,
    targetSeconds,
  );
  res.json(pace);
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
