import { helper } from '@ember/component/helper';

export const amenitiesMap = [
  ['feature_Promenade_Esplanade', 'Promenade/Esplanade'],
  ['feature_Seating_Lawn', 'Seating Lawn'],
  ['feature_pier', 'Pier'],
  ['feature_Wetland_Natural_Edge', 'Wetland/Natural Edge'],
  ['feature_Dog_run', 'Dog run'],
  ['feature_Educational_or_Interpretive', 'Educational or Interpretive features'],
  ['feature_Public_restroom', 'Public restroom'],
  ['feature_Shade_structure', 'Shade structure'],
  ['feature_Outdoor_art', 'Outdoor art'],
  ['feature_Food_or_Beverage_Concessions', 'Food or Beverage Concessions'],
  ['feature_Group_Seating', 'Group Seating'],
].map(([column, label]) => ({ label, column }));

export function amenityLookup([key]) {
  if (key) return amenitiesMap.find(({ column }) => (key === column));
  return amenitiesMap;
}

export default helper(amenityLookup);
