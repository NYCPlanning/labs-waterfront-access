import DS from 'ember-data';
import { alias } from '@ember/object/computed';
import LayerGroup from '@nycplanning/ember/models/layer-group';

const { attr } = DS;

export default class LayerGroupModel extends LayerGroup {
  @attr() meta

  @attr() legend

  @alias('legend.label') title

  /* universal filter */
  @attr() filter
}
