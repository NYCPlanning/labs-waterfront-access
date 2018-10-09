import DS from 'ember-data';
import { buildSqlUrl } from 'cartobox-promises-utility/utils/carto';

const SQL = function(id) {
  return `SELECT 
    st_x(st_centroid(the_geom)) as lon, 
    st_y(st_centroid(the_geom)) as lat,
    bbl AS id 
    FROM mappluto_v18_1 WHERE bbl=${id}`;
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
