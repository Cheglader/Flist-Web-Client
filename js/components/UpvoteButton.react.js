/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistStore = require('../stores/FlistStore');
var ApiConstants =  require('../constants/FlistAPIConstants');
var helpers = require('../helpers');
var UpvoteButton = React.createClass({

  getInitialState: function() {
    return {pressed : false};
  },
  render: function() {
    if (!this.state.pressed && FlistStore.getState().logged_in) {
      return React.createElement("button", {className:"btn btn-xs btn-success", onClick:this._on_button_click},
        React.createElement("i", {className:"fa fa-chevron-up"}));
    }
    return React.createElement("button", {className:"btn btn-xs btn-inverse"}, React.createElement("i", {className:"fa fa-chevron-up"}));
  },

  _on_button_click : function() {
    this.setState({pressed : true});
    var rest_request = helpers.createRequest('post', ApiConstants.RATE);
    rest_request.setRequestHeader("Content-Type", "application/json");
    rest_request.setRequestHeader('Authorization', 'Google ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
    rest_request.onreadystatechange = function() {
      if (rest_request.readyState == 4) {
        console.log('Rate Success');
      }
    }
    var request_json = {
      value: 1.0,
      restaurant_id: this.props.id,
      category_id: parseInt(FlistStore.getState().category.id)
    }
    rest_request.send(JSON.stringify(request_json))
  }

});

module.exports = UpvoteButton;
