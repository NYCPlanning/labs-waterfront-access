import DS from 'ember-data';
import { buildSqlUrl } from 'cartobox-promises-utility/utils/carto';

const SQL = function(id) {
  return `
    SELECT
      paws_id AS id,
      name AS park_name,
      maintained AS agency,
      constructi AS construction_status,
      adjacent_w AS water_body,
      the_geom,
      cpc_report,
      cpc_approv AS date_cpc_approval,
      chair_cert AS date_chair_certification,
      hours_open AS hours_of_operation,
      restrictiv AS restrictive_declaration_link,
      zap_link,
      summary_of AS description,
      shore_pu_1 AS spw_in_ft,
      shore_publ AS spaa_total_in_sf,
      feature_promenade_esplanade,
      feature_seating_lawn,
      feature_pier,
      feature_wetland_natural_edge,
      feature_dog_run,
      feature_educational_or_interpretive,
      feature_public_restroom,
      feature_shade_structure,
      feature_outdoor_art,
      feature_food_or_beverage_concessions,
      feature_group_seating,
      activity_volleyball_court,
      activity_basketball_court,
      activity_fishing,
      activity_boating_access,
      activity_tot_playground,
      activity_splash_feature,
      activity_other_recreational_facilities,
      activity_swimming
    FROM wpaas_v201810
    WHERE paws_id='${id}'
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
      'geojson',
    );
  }
}
