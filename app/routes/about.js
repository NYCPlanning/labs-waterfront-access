import Route from '@ember/routing/route';
import carto from 'cartobox-promises-utility/utils/carto';

const query = `
  WITH
  publiclyowned AS (
    SELECT
      count(*)
    FROM planninglabs.publiclyownedwaterfront_v201810
    WHERE status LIKE 'Constructed%25'
  ),

  paws AS (
    SELECT
      count(*)
    FROM wpaas_v201810
    WHERE constructi LIKE '%25Open'
  )

  SELECT
    publiclyowned.count AS publiclyowned_count,
    paws.count AS paws_count,
    publiclyowned.count %2B paws.count AS total_count
  FROM publiclyowned, paws
`;

export default class ShowProjectRoute extends Route {
  async model() {
    const [data] = await carto.SQL(query);
    return data;
  }
}
