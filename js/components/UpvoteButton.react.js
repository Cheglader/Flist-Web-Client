/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');

var UpvoteButton = React.createClass({

  getInitialState: function() {
    return {pressed : false};
  },
  render: function() {
    if (!this.state.pressed) {
      return (<button className="btn btn-xs btn-success" onClick={this._on_button_click}><i className="fa fa-chevron-up"></i></button>);
    }
    return (<button className="btn btn-xs btn-invserse"><i className="fa fa-chevron-up"></i></button>);
  },

  _on_button_click : function() {
    this.setState({pressed : true});
  }

});

module.exports = UpvoteButton;
