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

var _CATEGORY_STORE = {
  category_array: null
};

/**
 * Select a category
 * @param  {object} object containting {string}category id and {string}category string
 */

function set_category_list(category_array) {
  _CATEGORY_STORE.category_array = category_array;
}

var FlistCategoryStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire category store.
   * @return {object}
   */
  getState: function() {
    return _CATEGORY_STORE;
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
    case FlistConstants.SET_CATEGORY_LIST:
      set_category_list(action.data);
      FlistCategoryStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = FlistCategoryStore;
