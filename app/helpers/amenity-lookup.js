import { helper } from '@ember/component/helper';

const amenitiesMap = [
  ['column_name', 'Checklist'],
  ['lighting', 'lighting'],
  ['other_planting', 'unspecified plantings'],
  ['entry_gates', 'entry gates'],
  ['designated_bike_path', 'designated bike paths'],
  ['bike_racks', 'bike racks'],
  ['other_circulation_paths', 'other circulation paths'],
  ['ground_floor_retail', 'ground floor retail'],
  ['piers', 'piers'],
  ['ferry_watertaxi__service', 'ferry/water taxi service'],
  ['boat_launch', 'boat launch'],
  ['public_access_easement', 'public access easement'],
  ['guardrail', 'guardrails'],
  ['public_art', 'public art'],
  ['interpretive_displays', 'interpretive displays'],
  ['trash_receptacles', 'trash receptacles'],
  ['handicapped_accessible', 'handicapped accessible'],
  ['emergency_access', 'emergency access'],
].map((column, label) => ({ label, column }));

export function amenityLookup([key]) {
  if (key) return amenitiesMap.find(({ column }) => (key === column));
  return amenitiesMap;
}

export default helper(amenityLookup);
