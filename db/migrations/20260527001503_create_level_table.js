const table = "level";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(table, (table) => {
    table.increments("id").primary();
    table.string("race_type", 64).notNullable();
    table.string("label", 64).notNullable();
    table.string("sub_label", 64).notNullable();
    table.integer("max_seconds").notNullable();
    table.integer("width_percent").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(table);
};
