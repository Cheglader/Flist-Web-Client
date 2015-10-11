/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistState = require('../stores/FlistStore')
var FlistActions = require('../actions/FlistActions');
var FlistViewConstants = require('../constants/FlistViewConstants');
var Header = React.createClass({
  componentDidMount: function() {
    FlistState.addChangeListener(this._on_change);
  },
  /**
   * @return {object}
   */
  render: function() {
    if (this.props.view !== FlistViewConstants.CATEGORY && this.props.category_object)
    {
      var back_button = (this.props.view === FlistViewConstants.DETAIL)? (<li><a href="#" className="item-warning" onCLick={this._on_back}>Back</a></li>):null;
      var account_button = (FlistState.getState().logged_in) ? (<a href="#" onclick={this._logout}>Sign out</a>):(<div id="g-signin2" data-onsuccess="onSignIn"></div>);
      return (
          <ul className="nav navbar-nav navbar-center">
            {back_button}
            <li className="item-warning"><a href="#" onClick={this._on_category_click}>{this.props.category_object.name}</a></li>
            <li className=""><a>Houston</a></li>
            <li className="">{account_button}</li>
          </ul>
      );
    }
    return (
        <ul className="nav navbar-nav navbar-center">
          <li className=""><div id="g-signin2" data-onsuccess="onSignIn"></div></li>
        </ul>
    );
  },
  
  _on_category_click: function(event) {
    event.preventDefault();
    FlistActions.category_unselect();
  },

  _on_back: function(event) {
    event.preventDefault();
    FlistActions.view_change();
  },
  
  _on_sign_in : function(google_user) {
    var id_token = googleUser.getAuthResponse().id_token;
    FlistActions.login_user();
  },
  
  _logout : function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      FlistActions.logout_user();
    });
  },
  _create_google_login_button: function() {
    gapi.signin2.render('g-signin2', {
    'longtitle': true,
    'onsuccess': this._onSignIn,
    })
  },
  _on_change : function() {
    this.setState(FlistState.getState());
    this._create_google_login_button();
  }
});

module.exports = Header;
