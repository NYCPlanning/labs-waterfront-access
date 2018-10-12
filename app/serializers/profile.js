import DS from 'ember-data';

import { merge } from '@ember/polyfills';

const { JSONSerializer } = DS;

export default class ProfileSerializer extends JSONSerializer {
  normalizeFindRecordResponse(store, primaryModelClass, payload, queryId, requestType) {
    const [feature] = payload.features;
    const { id } = feature.properties;
    const { geometry } = feature;
    const json = merge(feature.properties, { id, geometry });

    return super.normalizeFindRecordResponse(store,
      primaryModelClass,
      json,
      id,
      requestType);
  }
}
