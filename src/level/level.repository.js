function createLevelRepository(knex, table = "level") {
  const findByRaceType = async (raceType) => {
    const result = await knex(table)
      .where("race_type", raceType)
      .orderBy("max_seconds", "asc");
    console.log(result);
    return result;
  };

  const update = async (id, payload) => {
    const [result] = await knex(table).where("id", id).update(payload, "*");
    console.log(result);
    return result;
  };

  return { findByRaceType, update };
}

module.exports = { createLevelRepository };
