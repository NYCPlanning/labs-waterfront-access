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
      b.trees
    FROM wpaas_v201810 a
    LEFT JOIN pawsmastertable b
      ON a.paws_id = b.paws_id::text
    WHERE a.paws_id='${id}'
  `;
};

const { JSONAPIAdapter } = DS;

export default class ProfileAdapter extends JSONAPIAdapter {
  static keyForAttribute(key) {
    return key;
  }

  static urlForFindRecord(id) {
    return buildSqlUrl(
      SQL(id),
    );
  }
}
