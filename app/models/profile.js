import DS from 'ember-data';
import { attr } from '@ember-decorators/data';
import convert from 'xml-js';
import { isArray } from '@ember/array';
import { restartableTask } from 'ember-concurrency-decorators';

const { Model } = DS;

const S3_BUCKET_HOST = 'https://waterfront-access-photos.nyc3.digitaloceanspaces.com';

export default class ProfileModel extends Model {
  @attr() geometry;

  @attr('string') paws_id;

  @attr('string') park_name;

  @attr('string') address;

  @attr('string') agency;

  @attr('string') category;

  @attr('string') status;

  @attr('string') water_body;

  @attr('string') cpc_report;

  @attr('string') date_cpc_approval;

  @attr('string') date_chair_certification;

  @attr('string') hours_of_operation;

  @attr('string') construction_status;

  @attr('string') restrictive_declaration_id;

  @attr('string') description;

  @attr('number') spw_in_ft;

  @attr('number') spaa_total_in_sf;

  @attr('boolean') feature_promenade_esplanade;

  @attr('boolean') feature_seating_lawn;

  @attr('boolean') feature_pier;

  @attr('boolean') feature_wetland_natural_edge;

  @attr('boolean') feature_dog_run;

  @attr('boolean') feature_educational_or_interpretive;

  @attr('boolean') feature_public_restroom;

  @attr('boolean') feature_shade_structure;

  @attr('boolean') feature_outdoor_art;

  @attr('boolean') feature_food_or_beverage_concessions;

  @attr('boolean') feature_group_seating;

  @attr('boolean') activity_volleyball_court;

  @attr('boolean') activity_basketball_court;

  @attr('boolean') activity_fishing;

  @attr('boolean') activity_boating_access;

  @attr('boolean') activity_tot_playground;

  @attr('boolean') activity_splash_feature;

  @attr('boolean') activity_other_recreational_facilities;

  @attr('boolean') activity_swimming;

  @restartableTask()
  images = function* () { // eslint-disable-line
    const id = this.get('paws_id');

    return fetch(`${S3_BUCKET_HOST}/?prefix=${id}`)
      .then(d => d.text())
      .then((xml) => {
        const json = convert.xml2js(xml, { compact: true });
        const { Contents: contents = [] } = json.ListBucketResult;

        const contentsArray = isArray(contents) ? contents : [contents];

        return contentsArray.map((d) => {
          const filename = d.Key._text;
          return `${S3_BUCKET_HOST}/${filename}`;
        });
      });
  }
}
