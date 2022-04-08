import { helper } from '@ember/component/helper';

export default helper(function timeMatch([sliceTime, occupantTime]) {
  return sliceTime === occupantTime;
});
