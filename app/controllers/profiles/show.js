import Controller from '@ember/controller';
import { computed } from '@ember-decorators/object';
import numeral from 'numeral';

export default class ProfileShowController extends Controller {
  @computed('model.spw_in_ft')
  get formattedSpwFt() {
    const spw_in_ft = this.get('model.spw_in_ft');
    const formattedNumber = numeral(spw_in_ft).format('0,0');

    return formattedNumber;
  }

  @computed('model.spaa_total_in_sf')
  get formattedSpaaTotalSqFt() {
    const spaa_total_in_sf = this.get('model.spaa_total_in_sf');
    const formattedNumber = numeral(spaa_total_in_sf).format('0,0');

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
