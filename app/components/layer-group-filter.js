import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { argument } from '@ember-decorators/argument';
import { required } from '@ember-decorators/argument/validation';
import { assert } from '@ember/debug';

const DECISION_TYPE = 'all'; // logical AND

/*
  LayerGroupFilterComponent

  Responsible for managing filter logic. Mutates a layerGroup model.
*/
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
  @required
  lookupTable = null;

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

  set checkedValues(selections) {
    const newSelections = selections
      .map(({ column }) => ['==', column, true]);
    const newExpression = [DECISION_TYPE].concat(newSelections);
    this.delegateFilters(newExpression);
  }

  @action
  updateValue(newList) {
    // const [{ column }] = newList;
    this.set('checkedValues', newList);
  }
}
