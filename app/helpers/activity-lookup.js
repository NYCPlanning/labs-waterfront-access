import { helper } from '@ember/component/helper';

export const activitiesMap = [
  ['activity_volleyball_court', 'Volleyball Court'],
  ['activity_basketball_court', 'Basketball Court'],
  ['activity_fishing', 'Fishing'],
  ['activity_boating_access', 'Boating/In-water Access'],
  ['activity_tot_playground', 'Tot Playground'],
  ['activity_splash_feature', 'Splash Feature'],
  ['activity_other_recreational_facilities', 'Other Recreational (Bocce, Skate Park, etc)'],
  ['activity_swimming', 'Swimming'],
].map(([column, label]) => ({ label, column }));

export function activityLookup([key]) {
  if (key) return activitiesMap.find(({ column }) => (key === column));
  return activitiesMap;
}

export default helper(activityLookup);
