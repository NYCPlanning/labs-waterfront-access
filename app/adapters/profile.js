import DS from 'ember-data';
import { buildSqlUrl } from 'cartobox-promises-utility/utils/carto';

const SQL = function(id) {
  return `
    SELECT
      paws_id AS id,
      park_name,
      address,
      agency,
      paws_id,
      category,
      status,
      water_body
    FROM wpaas_v201810 WHERE paws_id='${id}'
  `;
};

const { JSONAPIAdapter } = DS;

export default class ProfileAdapter extends JSONAPIAdapter {
  keyForAttribute(key) {
    return key;
  }

  urlForFindRecord(id) {
    return buildSqlUrl(
      SQL(id),
    );
  }
}
