import Route from '@ember/routing/route';

export default class ShowProjectRoute extends Route {
  async model({ id }) {
    const model = await this.store.findRecord('profile', id, { reload: true });
    const images = await fetch(`https://api.github.com/repos/nycplanning/labs-waterfront-access-photos/contents/${id}`)
      .then(d => d.json())

    if (!images.message) {
      model.set('images', images.map(d => d.download_url))
    }

    return model;
  }
}
