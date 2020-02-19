import Route from '@ember/routing/route';
import carto from 'cartobox-promises-utility/utils/carto';
import { action } from '@ember-decorators/object'; // eslint-disable-line

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
    FROM wam_wpaas
    WHERE status LIKE '%25Open'
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

  @action
  didTransition() {
    const applicationController = this.controllerFor('application');
    applicationController.set('sidebarIsClosed', true);
  }
}
