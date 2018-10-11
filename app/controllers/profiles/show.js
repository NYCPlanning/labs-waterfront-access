import Controller from '@ember/controller';
import { computed } from '@ember-decorators/object';

export default class ProfileShowController extends Controller {
  fakeImages = ["https://waterfront-access-photos.nyc3.digitaloceanspaces.com/5030011-PortRegalle.JPG", "https://waterfront-access-photos.nyc3.digitaloceanspaces.com/5030011-PortRegalle1.jpg"]
  @computed('model.construction_status')
  get isConstructed() {
    const status = this.get('model.construction_status');

    if (status === 'Constructed') return true;
    if (status === 'Constructed (full access)') return true;
    if (status === 'Constructed (Access Limited)') return true;
    if (status === 'Constructed (Access Restricted)') return true;

    return false;
  }
}
