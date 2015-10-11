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
    console.log(this.props.location);
    console.log(active_view);
    if (this.state.category == null && active_view !== FlistViewConstants.CATEGORY) {
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
  render: function () {
    var active_view = (this.props.location=='/category') ? FlistViewConstants.CATEGORY : FlistViewConstants.LIST;

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
            {React.cloneElement(this.props.children, {category_object: this.state.category})}
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
  <Route path="/" component={App}>
    {/*<Route name="restaurant" handler={RestaurantDetail}/>*/}
    <Route path="category" component={CategoryList}/>
    <IndexRoute component={RestaurantList}/>
  </Route>
);
ReactDOM.render(<RouterComponent routes={routes}/>, document.getElementById('flist_app'));
