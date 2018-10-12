import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { computed } from '@ember-decorators/object';
import { htmlSafe } from '@ember/template';


export default class BackgroundImageDivComponent extends Component {
  @argument
  image

  @computed('image')
  get style() {
    const image = this.get('image');
    return htmlSafe(`height:400px; width: 100%; background-image: url('${image}'); background-size: cover;`);
  }
}
