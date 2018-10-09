import DS from 'ember-data';
import { buildSqlUrl } from 'cartobox-promises-utility/utils/carto';

const SQL = function(id) {
  return `SELECT 
    st_x(st_centroid(the_geom)) as lon, 
    st_y(st_centroid(the_geom)) as lat,
    paws_id AS id 
    FROM wpaas_v201810 WHERE paws_id='${id}'`;
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
