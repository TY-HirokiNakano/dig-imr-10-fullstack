const path = require("path");
const express = require("express");
const { initPace } = require("./src/pace");
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require("./src/knex");

const paceRepository = initPace(knex);

// http通信で受け取るリクエストをjson形式に変換するための指示
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// app.use("/api", async (req, res) => {
//   res.send("Hello, World!");
// });

// app.get("/api/paces", async (req, res) => {
// app.get("/api/paces", async (req, res) => {
//   const paceRecord = await paceRepository.findById(1);
//   // res.send("id=1のデータ", paceRecord);
//   res.json(paceRecord);
// });

app.get("/api/paces", async (req, res) => {
  // console.log("req.body:    ", req.body);
  const { raceType, targetSeconds } = req.query;
  // console.log("raceType:", raceType, "targetSeconds:", targetSeconds);
  const pace = await paceRepository.findByRaceTypeAndTarget(
    raceType,
    Number(targetSeconds),
  );
  console.log("pace:   ", pace);
  res.json(pace);
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
