import { helper } from '@ember/component/helper';

export default helper(function isHour([val]) {
  return val % 30 === 0;
});
