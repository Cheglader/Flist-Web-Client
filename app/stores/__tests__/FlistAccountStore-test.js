/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 * FlistAccountStore Tests
 */

jest.dontMock('../../constants/FlistAccountConstants');
jest.dontMock('../FlistAccountStore');
jest.dontMock('object-assign');

describe('FlistStore', function() {

  var FlistAccountConstants = require('../../constants/FlistAccountConstants');
  var AppDispatcher;
  var FlistAccountStore;
  var callback;

  //Actions
  var actionSigninGoogle = {
    actionType: FlistAccountConstants.SIGNIN_GOOGLE_USER,
    data: {comment:"Dummy Object"}
  };
  var actionSignoutUser = {
    actionType: FlistAccountConstants.SIGNOUT_USER,
    data: {name: 'Sample'}
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    FlistAccountStore = require('../FlistAccountStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with an empty state', function() {
    var state = FlistAccountStore.getState();
    expect(state).toEqual({user_type: FlistAccountConstants.NO_ACCOUNT, user_object:null});
  });

  it('signs in google users', function() {
    callback(actionSigninGoogle);
    var state = FlistAccountStore.getState();
    expect(state).toEqual({user_type: FlistAccountConstants.NO_ACCOUNT, user_object:{comment:"Dummy Object"}});
  });

  it('signs out user', function() {
    callback(actionSigninGoogle);
    callback(actionSignoutUser);
    var state = FlistAccountStore.getState();
    expect(state).toEqual({user_type: FlistAccountConstants.NO_ACCOUNT, user_object:null});
  });
});
