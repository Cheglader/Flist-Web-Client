/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var $ = require('jquery');
var FlistActions = require('../actions/FlistActions');
var FlistListStore = require('../stores/FlistListStore');
var UpvoteButton = require('./UpvoteButton.react');
var DownvoteButton = require('./DownvoteButton.react');
var FlistAPIConstants = require('../constants/FlistAPIConstants');
function getFlistListState() {
  return FlistListStore.getState();
};

var RestaurantList = React.createClass({

  getInitialState: function() {
    return getFlistListState();
  },

  componentDidMount: function() {
    if (this.props.category_object != null) {
      FlistListStore.addChangeListener(this._onChange);
      $.get(FlistAPIConstants.RESTAURANT_LIST, {'ranked_city' : 1, 'category': this.props.category_object.id}, function(result) {
        if (this.isMounted()) {
          FlistActions.set_restaurant_list(result.results);
        }
      }.bind(this));
    }
  },

  componentWillUnmount: function() {
    FlistListStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    if (this.state.restaurant_list !== null) {
      var restaurant_dom_objects = this.state.restaurant_list.map(function(restaurant, restaurant_index) {
          var restaurant_rank = restaurant_index + 1;
          return React.createElement("tr", {key:restaurant.id},
            React.createElement("td", null, restaurant_rank),
            React.createElement("td", null, React.createElement(UpvoteButton, {id:restaurant.id}), React.createElement(DownvoteButton, {id:restaurant.id})),
            React.createElement("td", null, restaurant.name));
        });
        
      return React.createElement("table", {id:"restaurant-list", className:"table"}, React.createElement("tbody", null, restaurant_dom_objects)); 
    }
    return null;
  },

  _on_restaurant_click : function() {
    FlistActions.view_change();
  },

  _onChange: function() {
    this.setState(getFlistListState());
  }
});

module.exports = RestaurantList;
