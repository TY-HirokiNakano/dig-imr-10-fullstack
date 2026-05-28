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
      target_lower: 0,
      target_upper: 3600,
      e_pace_lower: 196,
      e_pace_upper: 219,
    },
    {
      race_type: "half_marathon",
      target_lower: 3600,
      target_upper: 4500,
      e_pace_lower: 249,
      e_pace_upper: 269,
    },
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
      target_upper: 9999999,
      e_pace_lower: 453,
      e_pace_upper: 507,
    },
  ]);
};
