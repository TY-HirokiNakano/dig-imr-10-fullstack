const { faker } = require("@faker-js/faker");

function user() {
  return {
    name: faker.person.firstName(),
  };
}

module.exports = { user };
