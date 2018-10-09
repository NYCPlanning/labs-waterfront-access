// import DS from 'ember-data';
// const { Serializer } = DS;

// export default class ApplicationSerializer extends Serializer {
// 	App.ApplicationSerializer = DS.RESTSerializer.extend({
// 	  primaryKey: 'bbl'
// 	});
// }

import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  // primaryKey: 'bbl'
});
