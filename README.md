# NYC Waterfront Access


## Requirements

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm) **version listed in .nvmrc**
* [Ember CLI](https://ember-cli.com/)
* [Yarn](https://yarnpkg.com/)

## Local development

* Clone this repo: `git clone git@github.com:NYCPlanning/labs-waterfront-access.git`
* Navigate to the directory: `cd labs-waterfront-access`
* Install dependencies: `yarn`
* Start the server: `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* If the app fails to load, create an empty .env file in the root directory.


## Testing and checks

- **ESLint** - We use ESLint with Airbnb's rules for JavaScript projects
  - Add an ESLint plugin to your text editor to highlight broken rules while you code
  - You can also run `eslint` at the command line with the `--fix` flag to automatically fix some errors.

- **Testing**
  - run `ember test --serve`
  - Before creating a Pull Request, make sure your branch is updated with the latest `develop` and passes all tests

## Images

Images associated with each waterfront profile are stored in a Digital Ocean Space (Amazon S3 Equivalent): [https://waterfront-access-photos.nyc3.digitaloceanspaces.com/](https://waterfront-access-photos.nyc3.digitaloceanspaces.com/).  When a profile is loaded, the app does an API call to get the filenames of any images in the space that begin with the `paws_id`.  When adding new images to the space, they should be prefixed with the `paws_id`, e.g `1010003-SouthStreetSeaportPier17Redevelopment.JPG`
* `yarn lint`
* `yarn lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
