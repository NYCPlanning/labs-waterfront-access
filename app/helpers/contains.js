import { helper } from '@ember/component/helper';

export function contains([array, value]) {
  return array.includes(value);
}

export default helper(contains);
