export default function (server) {
  server.create('slice', { startTime: '00:00', endTime: '00:30' });
  server.create('slice', { startTime: '00:30', endTime: '01:30' });
  server.create('slice', { startTime: '20:30', endTime: '21:30' });
  // server.create('slice', { startTime: '03:00', endTime: '04:00' });
  // server.create('slice', { startTime: '07:00', endTime: '09:30' });
}
