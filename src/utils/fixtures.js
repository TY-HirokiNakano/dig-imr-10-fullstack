import { faker } from "@faker-js/faker";

function user() {
  return {
    name: faker.person.firstName(),
  };
}
