import { faker } from '@faker-js/faker';
export const WarningsMock = Array.from({ length: 25 }).map(() => {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.lorem.word(8),
    category: faker.lorem.word(4),
    severity: faker.lorem.word(6),
    status: faker.datatype.boolean(),
    created_at: faker.date.weekday(),
    //pessoa
    //predio
    //criado
  };
});
