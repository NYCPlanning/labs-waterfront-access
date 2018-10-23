import { helper } from '@ember/component/helper';

export const amenitiesMap = [
  ['feature_promenade_esplanade', 'Promenade/Esplanade'],
  ['feature_seating_lawn', 'Seating Lawn'],
  ['feature_pier', 'Pier'],
  ['feature_wetland_natural_edge', 'Wetland/Natural Edge'],
  ['feature_dog_run', 'Dog run'],
  ['feature_educational_or_interpretive', 'Educational or Interpretive'],
  ['feature_public_restroom', 'Public restroom'],
  ['feature_shade_structure', 'Shade structure'],
  ['feature_outdoor_art', 'Outdoor art'],
  ['feature_food_or_beverage_concessions', 'Food or Beverage Concessions'],
  ['feature_group_seating', 'Group Seating'],
].map(([column, label]) => ({ label, column }));

export function amenityLookup([key]) {
  if (key) return amenitiesMap.find(({ column }) => (key === column));
  return amenitiesMap;
}

export default helper(amenityLookup);
