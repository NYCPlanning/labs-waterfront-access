import Route from '@ember/routing/route';
import convert from 'xml-js';
import { isArray } from '@ember/array';

export default class ShowProjectRoute extends Route {
  async model({ id }) {
    const model = await this.store.findRecord('profile', id, { reload: true });
    const images = await fetch(`https://waterfront-access-photos.nyc3.digitaloceanspaces.com/?prefix=${id}`)
      .then(d => d.text())
      .then(d => {
        const json = convert.xml2js(d, { compact: true })
        let { Contents: contents } = json.ListBucketResult;

        const contentsArray = isArray(contents) ? contents : [contents];

        return contentsArray.map(d => {
          const filename = d.Key._text;
          return `https://waterfront-access-photos.nyc3.digitaloceanspaces.com/${filename}`;
        })
      });

    model.set('images', images);

    return model;
  }
}
