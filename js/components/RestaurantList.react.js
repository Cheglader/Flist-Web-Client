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
    FlistListStore.addChangeListener(this._onChange);
    $.get(FlistAPIConstants.RESTAURANT_LIST, {'ranked_city' : 1, 'category': this.props.category_object.id}, function(result) {
      if (this.isMounted()) {
        FlistActions.set_restaurant_list(result.results);
      }
    }.bind(this));
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
          return(<tr key={restaurant.id}><td>{restaurant_rank}</td><td><UpvoteButton id={restaurant.id} /><DownvoteButton id={restaurant.id} /></td><td>{restaurant.name}</td></tr>);
        });

      return (
        <table className="table" id="restaurant-list"><tbody>{restaurant_dom_objects}</tbody></table>
      );
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
