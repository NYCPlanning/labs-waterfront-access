import DS from 'ember-data';
import { attr } from '@ember-decorators/data';
import convert from 'xml-js';
import { isArray } from '@ember/array';
import { restartableTask } from 'ember-concurrency-decorators';

const { Model } = DS;

const S3_BUCKET_HOST = 'https://waterfront-access-photos.nyc3.digitaloceanspaces.com';

export default class ProfileModel extends Model {
  @attr('string') park_name;

  @attr('string') paws_id;

  @attr('string') park_name;

  @attr('string') address;

  @attr('string') agency;

  @attr('string') paws_id;

  @attr('string') category;

  @attr('string') status;

  @attr('string') water_body;

  @attr('string') cpc_report;

  @attr('string') date_cpc_approval;

  @attr('string') date_chair_certification;

  @attr('string') date_lucats_completed;

  @attr('string') date_received;

  @attr('string') hours_of_operation;

  @attr('string') construction_status;

  @attr('string') restrictive_declaration_id;

  @attr('string') description;

  @attr('number') spw_in_ft;

  @attr('number') spaa_total_in_sf;

  @attr('boolean') bike_racks;

  @attr('boolean') boat_launch;

  @attr('boolean') designated_bike_path;

  @attr('boolean') emergency_access;

  @attr('boolean') entry_gates;

  @attr('boolean') ferry_watertaxi__service;

  @attr('boolean') ground_cover;

  @attr('boolean') ground_floor_retail;

  @attr('boolean') guardrail;

  @attr('boolean') handicapped_accessible;

  @attr('boolean') lighting;

  @attr('boolean') piers;

  @attr('boolean') public_access_easement;

  @attr('boolean') public_art;

  @attr('boolean') publicly_accessible_walkway;

  @attr('boolean') seating;

  @attr('boolean') shore_public_walkway;

  @attr('boolean') trash_receptacles;

  @attr('boolean') trees;

  @restartableTask()
  images = function* () { // eslint-disable-line
    const id = this.get('paws_id');

    return fetch(`${S3_BUCKET_HOST}/?prefix=${id}`)
      .then(d => d.text())
      .then(d => {
        const json = convert.xml2js(d, { compact: true })
        let { Contents: contents = [] } = json.ListBucketResult;

        const contentsArray = isArray(contents) ? contents : [contents];

        return contentsArray.map(d => {
          const filename = d.Key._text;
          return `${S3_BUCKET_HOST}/${filename}`;
        });
      });
  }
}
