/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var FlistActions = require('../actions/FlistActions');
var FlistCategoryStore = require('../stores/FlistCategoryStore');
var FlistAPIConstants = require('../constants/FlistAPIConstants');
function getFlistCategoryState() {
  return FlistCategoryStore.getState();
};

var CategoryList = React.createClass({
  mixins : [Router.History],
  getInitialState: function() {
    return getFlistCategoryState();
  },
  componentDidMount: function() {
    FlistCategoryStore.addChangeListener(this._onChange);
    $.get(FlistAPIConstants.CATEGORY_LIST, function(result) {
      if (this.isMounted()) {
        FlistActions.set_category_list(result);
      }
    }.bind(this));
  },

  componentWillUnmount: function() {
    FlistCategoryStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    if (this.state.category_array !== null) {
      var category_dom_objects = this.state.category_array.map(function(category_object, category_index) {
        return (
          <a onClick={this._on_category_click.bind(this, category_index)} key={category_object.id} href="#" className="list-group-item">{category_object.name}</a>
        );
      }, this);

      return (
        <section id="main">
          <div id="category-list" className="list-group">{category_dom_objects}</div>
        </section>
      );
    }
    return null;
  },

  _on_category_click : function(category_index, event) {
    event.preventDefault();
    FlistActions.category_select(this.state.category_array[category_index]);
    this.history.pushState(null, '/', null);
  },

  _onChange: function() {
    this.setState(getFlistCategoryState());
  }
});

module.exports = CategoryList;
