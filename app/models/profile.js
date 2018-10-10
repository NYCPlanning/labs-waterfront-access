import DS from 'ember-data';
import { attr } from '@ember-decorators/data';

const { Model } = DS;

export default class ProfileModel extends Model {
  @attr('string') park_name;
  @attr('string') address;
  @attr('string') agency;
  @attr('string') paws_id;
  @attr('string') category;
  @attr('string') status;
  @attr('string') water_body;
}
