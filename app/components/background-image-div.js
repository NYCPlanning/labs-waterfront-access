import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class BackgroundImageDivComponent extends Component {
  image

  @computed('image')
  get style() {
    const image = this.get('image');
    if (image) {
      return htmlSafe(`background-image: url('${image}');`);
    }
    return null;
  }
}
