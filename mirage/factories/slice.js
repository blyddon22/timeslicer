import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export default Factory.extend({
  name() {
    return faker.lorem.word();
  },
  date() {
    return DateTime.fromJSDate(faker.date.future()).toFormat('yyyy-LL-dd');
  },
  startTime() {
    return faker.date.future().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  },
  endTime() {
    return faker.date.future().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  },
  maxGuests() {
    return faker.random.number({ min: 1, max: 10 });
  },
});
