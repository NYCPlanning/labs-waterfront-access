import Component from '@ember/component';
import { computed, action } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { assert } from '@ember/debug';

const DECISION_TYPE = 'all'; // logical AND

// setFilterForLayer
export default class LayerGroupFilterComponent extends Component {
  init(...args) {
    super.init(...args);

    const isSingleSource = this.get('layerGroup.layers')
      .mapBy('style.source')
      .uniq()
      .length === 1;
    const filter = this.get('layerGroup.filter');

    assert('Layer Groups layers must all use the same source', isSingleSource);

    if (filter) this.delegateFilters(filter);
  }

  @required
  @argument
  layerGroup;

  delegateFilters(expression) {
    this.set('layerGroup.filter', expression);
    this.get('layerGroup.layers').forEach((layer) => {
      layer.set('filter', expression);
    });
  }

  @computed('layerGroup.filter')
  get checkedValues() {
    const [, ...expressions] = this.get('layerGroup.filter') || [];
    if (expressions) return expressions.map(([, column]) => column);
    return [];
  }

  set checkedValues(column) {
    // ['==', 'column', 'value']
    const [, ...selections] = this.get('layerGroup.filter') || [];
    let newSelections = selections;
    if (selections.map(([, col]) => col).includes(column)) {
      newSelections = selections.filter(([, col]) => col !== column);
    } else {
      newSelections = selections.concat([['==', column, true]]);
    }

    const newExpression = [DECISION_TYPE].concat(newSelections);

    this.delegateFilters(newExpression);
  }

  /*
    Lookup table structured as array of objects with two keys:
    ```
    [
      { column: 'value', label: 'value' }
      // more...
    ]
    ```
  */
  @argument
  lookupTable = null;

  @action
  updateValue(column) {
    this.set('checkedValues', column);
  }
}
