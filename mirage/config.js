export default function () {
  this.post(`/slices`);
  this.get(`/slices`);
  this.patch(`/slices/:id`);
}
