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
      target_lower: 4500,
      target_upper: 5400,
      e_pace_lower: 294,
      e_pace_upper: 329,
    },
    {
      race_type: "half_marathon",
      target_lower: 5400,
      target_upper: 6300,
      e_pace_lower: 346,
      e_pace_upper: 388,
    },
    {
      race_type: "half_marathon",
      target_lower: 6300,
      target_upper: 7200,
      e_pace_lower: 400,
      e_pace_upper: 448,
    },
    {
      race_type: "half_marathon",
      target_lower: 7200,
      target_upper: 8100,
      e_pace_lower: 453,
      e_pace_upper: 507,
    },
  ]);
};
