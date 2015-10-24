/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var ApiConstants =  require('../../constants/FlistAPIConstants');
var helpers = require('../helpers');
/*
* Components
*/
var SearchBar = React.createClass({
  getInitialState: function() {
    return {query_value: ""};
  },
  render: function() {
    return React.createElement("form", {className:"navbar-form navbar-center", role:"search"},
      React.createElement("div", {className:"form-group"},
        React.createElement("input", {type:"text", className:"form-control", placeholder:"Search", value:this.state.query_value, onChange:this.on_query_change})),
      React.createElement("button", {type:"submit", className:"btn btn-default", onClick:this._on_search_submit}, "Submit")
      );
  },
  _on_query_change: function(event) {
    this.setState({query_value: event.target.value});
  },
  _on_search_submit: function() {
    var rest_request = helpers.createRequest("get", ApiConstants.SEARCH);
    rest_request.setRequestHeader("Content-Type", "application/json");
    rest_request.setRequestHeader('Authorization', 'Google ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
    rest_request.onreadystatechange = function() {
      if (rest_request.readyState == 4) {
        console.log('Search Success');
        // TODO PROCESS REQUEST
      }
    }
    var request_json = {
      query: this.state.query_value,
    }
    rest_request.send(JSON.stringify(request_json))
  }
});

module.exports = SearchBar;
