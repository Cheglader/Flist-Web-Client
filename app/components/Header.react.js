/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistAccountStore = require('../stores/FlistAccountStore');
var FlistActions = require('../actions/FlistActions');

var FlistViewConstants = require('../constants/FlistViewConstants');
var FlistAccountConstants = require('../constants/FlistAccountConstants');

// Components
var SearchBar = require('./header-components/SearchBar.react');
var AccountBar = require('./header-components/AccountBar.react');

/*
* This sets up the Header component state.
*/
function setupState(){
  var account_store = FlistAccountStore.getState();
  return {
    signed_in: (account_store.user_type !== FlistAccountConstants.NO_ACCOUNT)
  };
}
var Header = React.createClass({
  getInitialState : function() {
    return setupState();
  },
  componentDidMount: function() {
    FlistAccountStore.addChangeListener(this._on_change);
  },
  
  render: function() {
    if (this.props.view !== FlistViewConstants.CATEGORY) {
      var back_button = (this.props.view === FlistViewConstants.DETAIL) ? React.createElement(
        "li", null,
          React.createElement("a", { href: "#", className: "item-warning", onCLick: undefined._on_back }, "Back")
        ) : null;
      
      return React.createElement("nav", {className:"collapse collapsing navbar-collapse"},
        React.createElement("ul", {className:"nav navbar-nav navbar-center"},
          back_button,
          React.createElement("li", {className:"item-warning"}, React.createElement("a", {href:"#", onClick:this._on_category_click}, this.props.category_object.name)
          ),
          React.createElement("li", {className:""}, React.createElement("a", null, "Houston"))
        ),
        React.createElement(SearchBar, null),
        React.createElement(AccountBar, {signed_in:this.state.signed_in})
      );
    } else {
      return React.createElement("nav", {className:"collapse collapsing navbar-collapse"}, React.createElement("ul", {className:"nav navbar-nav navbar-center"}));
    } 
  },
  _on_category_click: function(event) {
    event.preventDefault();
    FlistActions.category_unselect();
  },
  _on_back: function(event) {
    event.preventDefault();
    FlistActions.view_change();
  },
  _on_change : function() {
    this.setState(setupState());
  }

});

module.exports = Header;
