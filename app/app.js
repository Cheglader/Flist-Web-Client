/**
 * Copyright (c) 2015, Wannabe Mutants LLC
 * All rights reserved.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

var IndexRoute = Router.IndexRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var FlistStore = require('./stores/FlistStore');
var RouterComponent = Router.Router;
var FlistViewConstants = require('./constants/FlistViewConstants');
var RestaurantDetail = require('./components/RestaurantDetail.react');
var RestaurantList = require('./components/RestaurantList.react');
var Header = require('./components/Header.react');
var CategoryList = require('./components/CategoryList.react');
var App = React.createClass({
  mixins : [Router.History],
  getInitialState: function () {
  	return FlistStore.getState();
  },
  componentWillMount: function() {
    var active_view = (this.props.location.pathname=='/category') ? FlistViewConstants.CATEGORY : FlistViewConstants.LIST;
    if (this.state.category.id == null && active_view !== FlistViewConstants.CATEGORY) {
      this.history.pushState(null, '/category');
      //return null;
    }
  },
  componentDidMount: function() {
    FlistStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FlistStore.removeChangeListener(this._onChange);
  },

  componentWillUpdate: function(next_props, next_state) {
    var active_view = (this.props.location.pathname=='/category') ? FlistViewConstants.CATEGORY : FlistViewConstants.LIST;
    if (next_state.category.id == null && active_view !== FlistViewConstants.CATEGORY) {
      this.history.pushState(null, '/category');
    }
  },

  render: function () {
    var active_view = (this.props.location=='/category') ? FlistViewConstants.CATEGORY : FlistViewConstants.LIST;
    return React.createElement("div", {className:"page-box-content"},
      React.createElement("header", {className:"header header-two"},
        React.createElement("div", {className:"header-wrapper"},
          React.createElement("div", {className:"container"},
            React.createElement("div", {className:"row"},
              React.createElement("div", {className:"col-xs-6 col-md-2 col-lg-3 logo-box"},
                React.createElement("div", {className:"logo"},
                  React.createElement("img", {src:"img/flist.png", className:"logo-img", alt:""}))),
              React.createElement("div", {className:"col-xs-6 col-md-10 col-lg-9 right-box"},
                React.createElement("div", {className:"right-box-wrapper"},
                  React.createElement("div", {className:"primary"},
                    React.createElement("div", {className:"navbar navbar-default", role:"navigation"},
                      React.createElement("button", {type:"button", className:"navbar-toggle btn-navbar collapsed", "data-toggle":"collapse", "data-target":".primary .navbar-collapse"},
                        React.createElement("span", {className:"text"}, "Menu"),
                        React.createElement("span", {className:"icon-bar"}),
                        React.createElement("span", {className:"icon-bar"}),
                        React.createElement("span", {className:"icon-bar"})),
                      React.createElement(Header, {view:active_view, category_object:this.state.category}))))))))),
      React.createElement("section", {id:"main"},
        React.createElement("div", {className:"container"},
          React.createElement("div", {className:"row"}, React.cloneElement(this.props.children, {category_object: this.state.category}))))
    );
  },

  _onChange: function() {
  	this.setState(FlistStore.getState());
  }
});
var routes = React.createElement(Route, {path:"/", component:App},
  React.createElement(Route, {path:"category", component:CategoryList}),
  React.createElement(IndexRoute, {component:RestaurantList}));
ReactDOM.render(
  React.createElement(RouterComponent, {routes:routes}),
  document.getElementById('flist_app'));
