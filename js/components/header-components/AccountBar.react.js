/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistAccountActions = require('../actions/FlistAccountActions');
/*
* Components
*/
var AccountBar = React.createClass({
  componentDidUpdate: function() {
    if(document.getElementById('g-signin2')) {
      this._create_google_signin_button();
    }
  },
  render: function() {
    var bar_contents;
    if(this.props.signed_in) {
      bar_contents =  React.createElement("li", null, React.createElement("div", {id:"g-signin2", className:"g-signin2"}));
    } else{
      bar_contents =  React.createElement("li", null, React.createElement("a", {href:"#", onClick:this._signout}, "Sign Out"));
    }
    return React.createElement("ul", {className:"nav navbar-nav navbar-center"}, bar_contents);
  },
  _on_google_sign_in : function(google_user) {
    FlistAccountActions.signin_google_user(google_user);
  },
  
  _signout : function() {
    FlistAccountActions.signout_user();
  },
  _create_google_signin_button: function() {
    gapi.signin2.render('g-signin2', {
    'longtitle': false,
    'onsuccess': this._on_sign_in,
    })
  },
});

module.exports = AccountBar;
