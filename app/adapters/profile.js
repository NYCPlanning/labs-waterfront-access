import DS from 'ember-data';
import { buildSqlUrl } from '@nycplanning/ember/utils/carto';

const SQL = function(id) {
  return `
    SELECT
      wpaa_id AS id,
      name AS park_name,
      maintenanc AS agency,
      status AS construction_status,
      waterway AS water_body,
      the_geom,
      cpc_report,
      cpc_approv AS date_cpc_approval,
      chair_cert AS date_chair_certification,
      hours_open AS hours_of_operation,
      res_dec AS restrictive_declaration_link,
      zap_link,
      summary AS description,
      shore_line AS shore_walkway_ft,
      wpaa_area AS total_wpaa_sqft,
      f_promenad AS feature_promenade_esplanade,
      f_seatlawn AS feature_seating_lawn,
      f_pier AS feature_pier,
      f_wetland AS feature_wetland_natural_edge,
      f_dogrun AS feature_dog_run,
      f_edu_intp AS feature_educational_or_interpretive,
      f_restroom AS feature_public_restroom,
      f_shade AS feature_shade_structure,
      f_art AS feature_outdoor_art,
      f_food_bev AS feature_food_or_beverage_concessions,
      f_grpseat AS feature_group_seating,
      a_volleyct AS activity_volleyball_court,
      a_basketct AS activity_basketball_court,
      a_fishing AS activity_fishing,
      a_boating AS activity_boating_access,
      a_playgrnd AS activity_tot_playground,
      a_splash AS activity_splash_feature,
      a_otherrec AS activity_other_recreational_facilities,
      a_swimming AS activity_swimming
    FROM wpaas_v202205
    WHERE wpaa_id='${id}'
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
