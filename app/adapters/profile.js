import DS from 'ember-data';
import { buildSqlUrl } from 'cartobox-promises-utility/utils/carto';

const SQL = function(id) {
  return `
    SELECT
      a.paws_id AS id,
      a.park_name,
      a.address,
      a.agency,
      a.paws_id,
      a.category,
      a.status,
      a.water_body,
      a.the_geom,
      b.cpc_report,
      b.date_cpc_approval,
      b.date_chair_certification,
      b.date_lucats_completed,
      b.date_received,
      b.hours_of_operation,
      b.construction_status,
      b.restrictive_declaration_id,
      b.description,
      b.spw_in_ft,
      b.spaa_total_in_sf,
      b.bike_racks,
      b.boat_launch,
      b.designated_bike_path,
      b.emergency_access,
      b.entry_gates,
      b.ferry_watertaxi__service,
      b.ground_cover,
      b.ground_floor_retail,
      b.guardrail,
      b.handicapped_accessible,
      b.lighting,
      b.piers,
      b.public_access_easement,
      b.public_art,
      b.publicly_accessible_walkway,
      b.seating,
      b.shore_public_walkway,
      b.trash_receptacles,
      b.trees,
      b.feature_promenade_esplanade,
      b.feature_seating_lawn,
      b.feature_pier,
      b.feature_wetland_natural_edge,
      b.feature_dog_run,
      b.feature_educational_or_interpretive,
      b.feature_public_restroom,
      b.feature_shade_structure,
      b.feature_outdoor_art,
      b.feature_food_or_beverage_concessions,
      b.feature_group_seating,
      b.activity_volleyball_court,
      b.activity_basketball_court,
      b.activity_fishing,
      b.activity_boating_access,
      b.activity_tot_playground,
      b.activity_splash_feature,
      b.activity_other_recreational_facilities,
      b.activity_swimming
    FROM wpaas_v201810 a
    LEFT JOIN pawsmastertable b
      ON a.paws_id = b.paws_id::text
    WHERE a.paws_id='${id}'
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
