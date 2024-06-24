import { faker } from '@faker-js/faker';
export const WarningsMock = Array.from({ length: 25 }).map(() => {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.lorem.sentence(),
    description: faker.database.column(),
    severity: faker.lorem.sentence(),
    status: faker.datatype.boolean(),
    created_at: faker.date.past(),
  };
});
