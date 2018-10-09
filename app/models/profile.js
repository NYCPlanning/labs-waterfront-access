import DS from 'ember-data';
import { attr } from '@ember-decorators/data';

const { Model } = DS;

export default class ProfileModel extends Model {
  @attr('string') bbl;
}
