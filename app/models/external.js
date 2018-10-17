import DS from 'ember-data';
import { attr } from '@ember-decorators/data';

const { Model } = DS;

export default class ExternalModel extends Model {
  @attr() geometry;

  @attr('string') wf_park_id;

  @attr('string') park_name;

  @attr('string') link;

  @attr('string') agency;

  @attr('string') status;
}
