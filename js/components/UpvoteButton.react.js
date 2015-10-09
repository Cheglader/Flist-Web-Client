/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistStore = require('../stores/FlistStore');
var helpers = require('../helpers');
var UpvoteButton = React.createClass({

  getInitialState: function() {
    return {pressed : false};
  },
  render: function() {
    if (!this.state.pressed && FlistStore.getState().logged_in) {
      return (<button className="btn btn-xs btn-success" onClick={this._on_button_click}><i className="fa fa-chevron-up"></i></button>);
    }
    return (<button className="btn btn-xs btn-invserse"><i className="fa fa-chevron-up"></i></button>);
  },

  _on_button_click : function() {
    this.setState({pressed : true});
    var rest_request = helpers.createRequest('post', 'http://app.flistapp.com/restaurants/rate');
    rest_request.setRequestHeader('Authorization', 'Google ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
    rest_request.onreadystatechange = function() {
      if (rest_request.readyState == 4) {
        
      }
    }
    rest_request.send(DATA)
  }

});

module.exports = UpvoteButton;
