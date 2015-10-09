/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var FlistConstants = require('../constants/FlistConstants');

var FlistActions = {

  category_unselect: function() {
    AppDispatcher.dispatch({
      actionType: FlistConstants.CATEGORY_UNSELECT
    });
  },

  /**
   * @param  {object} the category object containing the {id} and the {name} of the category.
   */
  category_select: function(category_object) {
    AppDispatcher.dispatch({
      actionType: FlistConstants.CATEGORY_SELECT,
      data: category_object
    });
  },

  set_restaurant_list: function(restaurant_array) {
    AppDispatcher.dispatch({
      actionType: FlistConstants.SET_RESTAURANT_LIST,
      data: restaurant_array
    });
  },

  set_category_list: function(category_array) {
    AppDispatcher.dispatch({
      actionType: FlistConstants.SET_CATEGORY_LIST,
      data: category_array
    });
  },
  
  login_user: function(category_array) {
    AppDispatcher.dispatch({
      actionType: FlistConstants.LOGIN_USER,
    });
  },
  
  logout_user: function(category_array) {
    AppDispatcher.dispatch({
      actionType: FlistConstants.LOGOUT_USER,
    });
  },
};

module.exports = FlistActions;
