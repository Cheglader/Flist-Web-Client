/**
 * Copyright (c) 2015, Wannabe Mutants LLC
 * All rights reserved.
 */

var React = require('react');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var FlistStore = require('./stores/FlistStore');

var FlistViewConstants = require('./constants/FlistViewConstants');

var RestaurantDetail = require('./components/RestaurantDetail.react');
var RestaurantList = require('./components/RestaurantList.react');
var Header = require('./components/Header.react');
var CategoryList = require('./components/CategoryList.react');

var App = React.createClass({
  mixins : [Router.State, Router.Navigation],
  getInitialState: function () {
  	return FlistStore.getState();
  },

  componentDidMount: function() {
    FlistStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FlistStore.removeChangeListener(this._onChange);
  },
  render: function () {
  	var active_view = this.isActive('category', this.getParams(), this.getQuery()) ? FlistViewConstants.CATEGORY : this.isActive('restaurant', this.getParams(), this.getQuery()) ? FlistViewConstants.DETAIL : FlistViewConstants.LIST;
    if (this.state.category == null && active_view !== FlistViewConstants.CATEGORY) {
      this.transitionTo('category');
      return null;
    }
    return (
      <div className="page-box-content">
      <header className="header header-two">
        <div className="header-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-md-2 col-lg-3 logo-box">
                <div className="logo">
                  <img src="img/flist.png" className="logo-img" alt="" />
                </div>
              </div>
    
              <div className="col-xs-6 col-md-10 col-lg-9 right-box">
                <div className="right-box-wrapper">
      
                  <div className="primary">
                    <div className="navbar navbar-default" role="navigation">
                      <button type="button" className="navbar-toggle btn-navbar collapsed" data-toggle="collapse" data-target=".primary .navbar-collapse">
                        <span className="text">Menu</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
    
                      <nav className="collapse collapsing navbar-collapse">
                        <Header view={active_view} category_object={this.state.category}/>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        </div>
      </header>
      <section id="main">
        <div className="container">
          <div className="row">
            <RouteHandler category_object={this.state.category}/>
          </div>
        </div>
      </section>
      </div>
    );
  },

  _onChange: function() {
  	this.setState(FlistStore.getState());
  }
});

var routes = (
  <Route name="list" path="/" handler={App}>
    {/*<Route name="restaurant" handler={RestaurantDetail}/>*/}
    <Route name="category" handler={CategoryList}/>
    <DefaultRoute handler={RestaurantList}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('flist_app'));
});

