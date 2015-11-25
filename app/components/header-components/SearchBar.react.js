/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var ApiConstants =  require('../../constants/FlistAPIConstants');
var helpers = require('../../helpers');
/*
* Components
*/
var SearchBar = React.createClass({
  getInitialState: function() {
    return {query_value: ""};
  },
  render: function() {
    return React.createElement("form", {className:"navbar-form navbar-right", role:"search"},
      React.createElement("div", {className:"form-group"},
        React.createElement("input", {type:"text", className:"form-control", placeholder:"Search", value:this.state.query_value, onChange:this._on_query_change})),
      React.createElement("button", {type:"submit", className:"btn btn-default", onClick:this._on_search_submit}, "Submit")
      );
  },
  _on_query_change: function(event) {
    this.setState({query_value: event.target.value});
  },
  _on_search_submit: function(e) {
    e.preventDefault();
    // TODO
    console.log("Searching");
    var rest_request = helpers.createIdRequest("get", ApiConstants.SEARCH);
    rest_request.onreadystatechange = function() {
        console.log("Search_Success");
    }
    var request_json = {
      query: this.state.query_value,
    }
    rest_request.send(JSON.stringify(request_json));
  }
});

module.exports = SearchBar;
