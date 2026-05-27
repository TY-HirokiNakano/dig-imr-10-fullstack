function createLevelRepository(knex, table = "level") {
  const findByRaceType = async (raceType) => {
    const result = await knex(table)
      .where("race_type", raceType)
      .orderBy("max_seconds", "asc");
    console.log(result);
    return result;
  };
  return { findByRaceType };
}

module.exports = { createLevelRepository };
