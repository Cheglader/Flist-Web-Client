/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlistConstants = require('../constants/FlistConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _RESTAURANT_LIST_STORE = {
  restaurant_list: null
}

function set_restaurant_list(restaurant_array) {
  _RESTAURANT_LIST_STORE.restaurant_list = restaurant_array;
}

var FlistListStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire restaurant list store object.
   * @return {object}
   */
  getState: function() {
    return _RESTAURANT_LIST_STORE;
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case FlistConstants.SET_RESTAURANT_LIST:
      set_restaurant_list(action.data);
      FlistListStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = FlistListStore;
