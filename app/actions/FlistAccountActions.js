/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var FlistAccountConstants = require('../constants/FlistAccountConstants');

var FlistAccountActions = {
  signin_google_user: function(google_user) {
    AppDispatcher.dispatch({
      actionType: FlistAccountConstants.SIGNIN_GOOGLE_USER,
      data: google_user
    });
  },
  
  signout_user: function() {
    AppDispatcher.dispatch({
      actionType: FlistAccountConstants.SIGNOUT_USER,
    });
  },
};

module.exports = FlistAccountActions;
