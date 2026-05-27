const path = require("path");
const express = require("express");
const { initPace } = require("./src/pace");
const { initLevel } = require("./src/level");
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require("./src/knex");

const paceRepository = initPace(knex);
const levelRepository = initLevel(knex);

// http通信で受け取るリクエストをjson形式に変換するための指示
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/api/paces", async (req, res) => {
  // console.log("req.body:    ", req.body);
  const { raceType, targetSeconds } = req.query;
  // console.log("raceType:", raceType, "targetSeconds:", targetSeconds);
  const pace = await paceRepository.findByRaceTypeAndTarget(
    raceType,
    Number(targetSeconds),
  );
  if (!pace) {
    res.status(404).json({ message: "該当するペースが見つかりません" });
  }
  console.log("pace:   ", pace);
  res.json(pace);
});

app.get("/api/levels", async (req, res) => {
  const { raceType } = req.query;
  const levels = await levelRepository.findByRaceType(raceType);
  res.json(levels);
});

// 検索や絞り込みの場合はクエリパラメータ、操作の場合はパスパラメータが一般的らしい
app.put("/api/levels/:id", async (req, res) => {
  const { id } = req.params;
  await levelRepository.update(id, req.body);
  res.status(204).send();
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
