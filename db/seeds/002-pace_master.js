/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pace_master").del();
  await knex("pace_master").insert([
    {
      race_type: "half_marathon",
      target_lower: 50,
      target_upper: 100,
      e_pace_lower: 150,
      e_pace_upper: 200,
    },
    {
      race_type: "half_marathon",
      target_lower: 150,
      target_upper: 200,
      e_pace_lower: 250,
      e_pace_upper: 300,
    },
    {
      race_type: "half_marathon",
      target_lower: 200,
      target_upper: 250,
      e_pace_lower: 350,
      e_pace_upper: 400,
    },
  ]);
};
