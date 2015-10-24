/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 * FlistStore Tests
 */

jest.dontMock('../../constants/FlistConstants');
jest.dontMock('../FlistStore');
jest.dontMock('object-assign');

describe('FlistStore', function() {

  var FlistConstants = require('../../constants/FlistConstants');
  var AppDispatcher;
  var FlistStore;
  var callback;

  //Actions
  var actionCategoryUnselect = {
    actionType: FlistConstants.CATEGORY_UNSELECT
  };
  var actionCategorySelect = {
    actionType: FlistConstants.CATEGORY_SELECT,
    data: {name: 'Sample'}
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    FlistStore = require('../FlistStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with an empty state', function() {
    var state = FlistStore.getState();
    expect(state).toEqual({category: null});
  });

  it('selects a category', function() {
    callback(actionCategorySelect);
    var state = FlistStore.getState();
    expect(state.category).toEqual({name: 'Sample'});
  });

  it('unselects a category', function() {
    callback(actionCategorySelect);
    var state = FlistStore.getState();
    expect(state.category).toEqual({name: 'Sample'});

    callback(actionCategoryUnselect);
    state = FlistStore.getState();
    expect(state.category).toEqual(null);
  });
});
