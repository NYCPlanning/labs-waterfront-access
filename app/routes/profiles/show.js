import Route from '@ember/routing/route';

export default class ShowProjectRoute extends Route {
  async model({ id }) {
    const profile = await this.store.findRecord('profile', id, { reload: true });
    profile.images.perform();
    return profile;
  }
}
