const { createPaceRepository } = require("./pace.repository");

function initPace(knex) {
  const repository = createPaceRepository(knex);

  return repository;
}

module.exports = { initPace };
