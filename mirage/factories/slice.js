import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  name: faker.lorem.word(),
  date: faker.date.future().toLocaleDateString(),
  startTime: faker.time.recent('abbr'),
  endTime: faker.time.recent('abbr'),
  maxGuests: faker.random.number({ min: 1, max: 10 }),
});
