import { helper } from '@ember/component/helper';

export default helper(function fromMinutes([minutes]) {
  let value = minutes / 60;
  let splitVal = value.toString().split('.');

  if (splitVal.length > 1) {
    return `${splitVal[0].padStart(2, '0')}:${(value - parseInt(value)) * 60}`;
  }

  return `${parseInt(value).toString().padStart(2, '0')}:00`;
});
