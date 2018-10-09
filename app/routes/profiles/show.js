import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object';

export default class ShowProjectRoute extends Route {
  model({ profile_id }) {
    return this.store.findRecord('profile', profile_id, { reload: true });
  }
}