import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { computed } from '@ember/object';
import mustache from 'mustache';

export default class TooltipRenderer extends Component {
  @argument
  feature = {}

  @argument
  template = ''

  @computed('feature', 'template')
  get renderedText() {
    const properties = this.get('feature.properties');
    const template = this.get('template');

    return mustache.render(template, properties);
  }
}
