import { helper } from '@ember/component/helper';

export function filterBy([objectList, values, key = 'column']) {
  return objectList.filter(object => values.includes(object[key]));
}

export default helper(filterBy);
