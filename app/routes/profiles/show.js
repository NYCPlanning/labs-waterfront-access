import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object';

export default class ShowProjectRoute extends Route {
  model({ id }) {
    return this.store.findRecord('profile', id, { reload: true });
  }
}