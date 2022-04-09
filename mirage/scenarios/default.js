export default function (server) {
  server.create('slice', { startTime: '00:00', endTime: '02:30' });
  server.create('slice', { startTime: '03:00', endTime: '04:00' });
  server.create('slice', { startTime: '07:00', endTime: '09:30' });
}
