/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistState = require('../stores/FlistStore')
var FlistActions = require('../actions/FlistActions');
var FlistViewConstants = require('../constants/FlistViewConstants');

var HeaderAccountBar = React.createClass({
  componentDidMount: function() {
    FlistState.addChangeListener(this._on_change);
  },
  componentDidUpdate: function() {
    if(document.getElementById('g-signin2')) {
      this._create_google_login_button();
    }
  },
  /**
   * @return {object}
   */
  render: function() {
    if (/*this.props.view !== FlistViewConstants.CATEGORY && */this.props.category_object)
    {
      var back_button = (this.props.view === FlistViewConstants.DETAIL)? (<li><a href="#" className="item-warning" onCLick={this._on_back}>Back</a></li>):null;
      var account_button = (FlistState.getState().logged_in) ? (<a href="#" onClick={this._logout}>Sign out</a>):(<div id="g-signin2" className="g-signin2"></div>);
      return (
          <ul className="nav navbar-nav navbar-right">
            <li className="">{account_button}</li>
          </ul>
      );
    }
  },
  _on_sign_in : function(google_user) {
    var id_token = google_user.getAuthResponse().id_token;
    FlistActions.login_user();
  },
  
  _logout : function() {
    console.log("logout called");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User Logged Out");
      FlistActions.logout_user();
    });
  },
  _create_google_login_button: function() {
    console.log("Render called");
    console.log(document.getElementById('g-signin2'));
    gapi.signin2.render('g-signin2', {
    'longtitle': false,
    'onsuccess': this._on_sign_in,
    })
    console.log("Render Ended");
  },
  _on_change : function() {
    this.setState(FlistState.getState());
  }

});

module.exports = HeaderAccountBar;
