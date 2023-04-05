import Route from '@ember/routing/route';
import carto from '@nycplanning/ember/utils/carto';
import { action } from '@ember/object';

const query = `
  WITH
  publiclyowned AS (
    SELECT
      count(*)
    FROM planninglabs.publiclyownedwaterfront
    WHERE status LIKE 'Constructed%25'
  ),

  paws AS (
    SELECT
      count(*)
    FROM wpaas_v202205
    WHERE status LIKE '%25Open'
  )

  SELECT
    publiclyowned.count AS publiclyowned_count,
    paws.count AS paws_count,
    publiclyowned.count %2B paws.count AS total_count
  FROM publiclyowned, paws
`;

export default class AboutRoute extends Route {
  async model() {
    const [data] = await carto.SQL(query);
    return data;
  }

  @action
  didTransition() {
    const applicationController = this.controllerFor('application');
    applicationController.set('sidebarIsClosed', true);
  }
}
