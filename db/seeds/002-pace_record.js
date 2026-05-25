/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pace_record").del();
  await knex("pace_record").insert([
    {
      race_type: "half_marathon",
      best: 100,
      target: 50,
      e_pace_lower: 200,
      e_pace_upper: 150,
    },
    {
      race_type: "half_marathon",
      best: 200,
      target: 150,
      e_pace_lower: 300,
      e_pace_upper: 250,
    },
    {
      race_type: "half_marathon",
      best: 300,
      target: 250,
      e_pace_lower: 400,
      e_pace_upper: 350,
    },
  ]);
};
