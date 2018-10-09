import DS from 'ember-data';
import fetch from 'fetch';
import config from '../config/environment';

const { host } = config;
const { JSONAPIAdapter } = DS;

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = host;
  namespace = 'v1';

  async query(store, type, query = {}) {
    const URL = this.buildURL(type.modelName);

    return fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(query),
    }).then(blob => blob.json());

  }
}
