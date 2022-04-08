import { helper } from '@ember/component/helper';

export default helper(function inRange([start, end, index]) {
  return start <= index <= end;
});
