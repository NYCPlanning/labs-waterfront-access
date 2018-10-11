import DS from 'ember-data';

const { JSONSerializer } = DS;

export default class ProfileSerializer extends JSONSerializer {
  normalizeFindRecordResponse(store, primaryModelClass, { rows: [row] }, queryId, requestType) {
    return super.normalizeFindRecordResponse(store,
      primaryModelClass,
      row,
      queryId,
      requestType);
  }
}
