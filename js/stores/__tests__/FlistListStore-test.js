/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 * FlistListStore Tests
 */

jest.dontMock('../../constants/FlistConstants');
jest.dontMock('../FlistListStore');
jest.dontMock('object-assign');

describe('FlistListStore', function() {

  var FlistConstants = require('../../constants/FlistConstants');
  var AppDispatcher;
  var FlistListStore;
  var callback;

  //Actions
  var actionSetRestaurantList = {
    actionType: FlistConstants.SET_RESTAURANT_LIST,
    data: [1, 69]
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    FlistListStore = require('../FlistListStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no restaurant items', function() {
    var state = FlistListStore.getState();
    expect(state).toEqual({restaurant_list: null});
  });

  it('sets restaurant items', function() {
    callback(actionSetRestaurantList);
    var flist_list_state = FlistListStore.getState();
    expect(flist_list_state.restaurant_list.length).toBe(2);
    expect(flist_list_state.restaurant_list[1]).toEqual(69);
  });

});
