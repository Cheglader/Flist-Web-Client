/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 * FlistCategoryStore Tests
 */

jest.dontMock('../../constants/FlistConstants');
jest.dontMock('../FlistCategoryStore');
jest.dontMock('object-assign');

describe('FlistCategoryStore', function() {

  var FlistConstants = require('../../constants/FlistConstants');
  var AppDispatcher;
  var FlistCategoryStore;
  var callback;

  //Actions
	var actionSetCategoryList = {
		actionType: FlistConstants.SET_CATEGORY_LIST,
		data: [1, 69]
	};

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    FlistCategoryStore = require('../FlistCategoryStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with no category items', function() {
    var state = FlistCategoryStore.getState();
    expect(state).toEqual({category_array: null});
  });

  it('sets category items', function() {
    callback(actionSetCategoryList);
    var category_state = FlistCategoryStore.getState();
    expect(category_state.category_array.length).toBe(2);
    expect(category_state.category_array[1]).toEqual(69);
  });

});
