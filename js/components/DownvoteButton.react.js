/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');

var DownvoteButton = React.createClass({

  getInitialState: function() {
    return {pressed : false};
  },
  render: function() {
    if (!this.state.pressed) {
      return (<button className="btn btn-xs btn-danger" onClick={this._on_button_click}><i className="fa fa-chevron-down"></i></button>);
    }
    return (<button className="btn btn-xs btn-invserse"><i className="fa fa-chevron-down"></i></button>);
  },

  _on_button_click : function() {
    //
    this.setState({pressed : true});
  }

});

module.exports = DownvoteButton;
