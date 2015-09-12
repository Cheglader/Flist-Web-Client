/**
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var React = require('react');
var FlistActions = require('../actions/FlistActions');
var FlistViewConstants = require('../constants/FlistViewConstants');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    if (this.props.view !== FlistViewConstants.CATEGORY)
    {
      var back_button = null;
      if (this.props.view === FlistViewConstants.DETAIL) 
      {
        back_button = <li><a href="#" className="item-warning" onCLick={this._on_back}>Back</a></li>
      }
      else 
      {
        back_button = null;
      }
      return (
          <ul className="nav navbar-nav navbar-center">
            {back_button}
            <li className="item-warning"><a href="#" onClick={this._on_category_click}>{this.props.category_object.name}</a></li>
            <li className=""><a>Houston</a></li>
          </ul>
      );
    }
    return null;
  },
  
  _on_category_click: function(event) {
    event.preventDefault();
    FlistActions.category_unselect();
  },

  _on_back: function(event) {
    event.preventDefault();
    FlistActions.view_change();
  }
});

module.exports = Header;