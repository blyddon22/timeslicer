import { DateTime } from 'luxon';

export default function (server) {
  server.create('slice', {
    date: DateTime.now().toFormat('yyyy-LL-dd'),
    startTime: '00:00',
    endTime: '00:30',
  });
  server.create('slice', {
    date: DateTime.now().plus({ days: -1 }).toFormat('yyyy-LL-dd'),
    startTime: '01:00',
    endTime: '03:30',
  });
  server.create('slice', {
    date: DateTime.now().plus({ days: 1 }).toFormat('yyyy-LL-dd'),
    startTime: '08:00',
    endTime: '14:00',
  });
}
