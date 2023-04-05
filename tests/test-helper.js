import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import Application from 'labs-waterfront-access/app';
import config from 'labs-waterfront-access/config/environment';

setApplication(Application.create(config.APP));

start();
