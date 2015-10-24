/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlistAccountConstants = require('../constants/FlistAccountConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _Flist_Account_Store = {
  user_type: FlistAccountConstants.NO_ACCOUNT,
  user_object: null,
}

function signin_google(google_user) {
  _Flist_Account_Store.user_object = google_user;
}

function signout_user() {
  switch(_Flist_Account_Store.user_type) {
    case FlistAccountConstants.GOOGLE_ACCOUNT:
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {});
      break;
  }
  _Flist_Account_Store.user_type = FlistAccountConstants.NO_ACCOUNT;
  _Flist_Account_Store.user_object = null;
  console.log("User Signed Out");
}

var FlistAccountStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire Flist State store object.
   * @return {object}
   */
  getState: function() {
    return _Flist_Account_Store;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case FlistAccountConstants.SIGNIN_GOOGLE_USER:
      signin_google(action.data);
      FlistAccountStore.emitChange();
      break;
    case FlistAccountConstants.SIGNOUT_USER:
      signout_user();
      FlistAccountStore.emitChange();
      break;
  }
});

module.exports = FlistAccountStore;
