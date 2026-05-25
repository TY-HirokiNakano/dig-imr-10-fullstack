/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pace_record", (table) => {
    table.increments("id").primary();
    table.string("race_type", 64).notNullable();
    table.integer("best").notNullable();
    table.integer("target").notNullable();
    table.integer("e_pace_lower").notNullable();
    table.integer("e_pace_upper").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pace_record");
};
