/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var $ = require('jquery');
var FlistActions = require('../actions/FlistActions');
var FlistAPIConstants = require('../constants/FlistAPIConstants');
var FlistAccountConstants = require('../constants/FlistAccountConstants');

var FlistListStore = require('../stores/FlistListStore');
var FlistAccountStore = require('../stores/FlistAccountStore');



var UpvoteButton = require('./UpvoteButton.react');
var DownvoteButton = require('./DownvoteButton.react');

function setupState() {
  return {
    can_vote: (FlistAccountStore.getState().user_type !== FlistAccountConstants.NO_ACCOUNT),
    restaurant_list: FlistListStore.getState().restaurant_list
  };
};

var RestaurantList = React.createClass({
  
  getInitialState: function() {
    return setupState();
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
            React.createElement("td", null, React.createElement(UpvoteButton, {id:restaurant.id, can_use:this.state.can_vote}), React.createElement(DownvoteButton, {id:restaurant.id, can_use:this.state.can_vote})),
            React.createElement("td", null, restaurant.name));
        }, this);
        
      return React.createElement("table", {id:"restaurant-list", className:"table"}, React.createElement("tbody", null, restaurant_dom_objects)); 
    }
    return null;
  },

  _on_restaurant_click : function() {
    FlistActions.view_change();
  },

  _onChange: function() {
    this.setState(setupState());
  }
});

module.exports = RestaurantList;
