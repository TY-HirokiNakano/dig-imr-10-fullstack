const { createLevelRepository } = require("./level.repository");

function initLevel(knex) {
  const repository = createLevelRepository(knex);

  return repository;
}

module.exports = { initLevel };
