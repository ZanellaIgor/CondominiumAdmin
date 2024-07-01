import { faker } from '@faker-js/faker';
export const surveyMock = Array.from({ length: 25 }).map(() => {
  return {
    id: faker.number.int({ min: 1, max: 1000000 }),
    title: faker.lorem.sentence(),
    space: faker.lorem.sentence(),
    purpose: faker.lorem.sentence(),
    description: faker.database.column(),
    status: faker.datatype.boolean(),
    created_at: faker.date.past(),
    dateTime: faker.date.anytime(),
    dateReservation: faker.date.anytime(),
    //condominio - pessoa
  };
});
