import Controller from '@ember/controller';
import { computed } from '@ember/object';
import numeral from 'numeral';

export default class ProfileShowController extends Controller {
  @computed('model.shore_walkway_ft')
  get formattedShoreWalkwayFt() {
    const shore_walkway_ft = this.get('model.shore_walkway_ft');
    const formattedNumber = numeral(shore_walkway_ft).format('0,0');

    return formattedNumber;
  }

  @computed('model.total_wpaa_sqft')
  get formattedTotalWpaaSqft() {
    const total_wpaa_sqft = this.get('model.total_wpaa_sqft');
    const formattedNumber = numeral(total_wpaa_sqft).format('0,0');

    return formattedNumber;
  }

  @computed('model.construction_status')
  get isConstructed() {
    const status = this.get('model.construction_status');

    if (status === 'Open') return true;
    if (status === 'Partially Open') return true;

    return false;
  }

  @computed('model.construction_status')
  get hasSiteFeatures() {
    if (this.get('model.feature_promenade_esplanade')) return true;
    if (this.get('model.feature_seating_lawn')) return true;
    if (this.get('model.feature_pier')) return true;
    if (this.get('model.feature_wetland_natural_edge')) return true;
    if (this.get('model.feature_dog_run')) return true;
    if (this.get('model.feature_educational_or_interpretive')) return true;
    if (this.get('model.feature_public_restroom')) return true;
    if (this.get('model.feature_shade_structure')) return true;
    if (this.get('model.feature_outdoor_art')) return true;
    if (this.get('model.feature_food_or_beverage_concessions')) return true;
    if (this.get('model.feature_group_seating')) return true;

    return false;
  }

  @computed('model.construction_status')
  get hasActiveUseAmenities() {
    if (this.get('model.activity_volleyball_court')) return true;
    if (this.get('model.activity_basketball_court')) return true;
    if (this.get('model.activity_fishing')) return true;
    if (this.get('model.activity_boating_access')) return true;
    if (this.get('model.activity_tot_playground')) return true;
    if (this.get('model.activity_splash_feature')) return true;
    if (this.get('model.activity_other_recreational_facilities')) return true;

    return false;
  }
}
