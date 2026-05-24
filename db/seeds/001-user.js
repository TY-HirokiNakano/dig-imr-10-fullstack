const fixture = require("../../src/utils/fixtures");

const userData = Array.from({ length: 3 }, () => fixture.user());

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert(userData);
};
