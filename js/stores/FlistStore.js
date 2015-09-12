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

var _Flist_State = {
  category: null,
}

/**
 * Unselect the current category
 */
function category_unselect() {
  _Flist_State['category'] = null
}

/**
 * Select a category
 * @param  {object} object containting {string}category id and {string}category string
 */
function category_select(category_object) {
  _Flist_State['category'] = category_object;
}

var FlistStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire Flist State store object.
   * @return {object}
   */
  getState: function() {
    return _Flist_State;
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
    case FlistConstants.CATEGORY_UNSELECT:
      category_unselect();
      FlistStore.emitChange();
      break;

    case FlistConstants.CATEGORY_SELECT:
      category_select(action.data);
      FlistStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = FlistStore;
