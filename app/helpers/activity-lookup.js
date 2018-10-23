import { helper } from '@ember/component/helper';

export const amenitiesMap = [
  ['activity_volleyball_court', 'Volleyball Court'],
  ['activity_basketball_court', 'Basketball Court'],
  ['activity_fishing', 'Fishing'],
  ['activity_boating_access', 'Boating/In-water Access'],
  ['activity_tot_playground', 'Tot Playground'],
  ['activity_splash_feature', 'Splash Feature'],
  ['activity_other_recreational_facilities', 'Other Recreational (Bocce, Skate Park, etc)'],
  ['activity_swimming', 'Swimming'],
].map(([column, label]) => ({ label, column }));

export function amenityLookup([key]) {
  if (key) return amenitiesMap.find(({ column }) => (key === column));
  return amenitiesMap;
}

export default helper(amenityLookup);
