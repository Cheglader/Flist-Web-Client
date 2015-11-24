/*
 * Copyright (c) 2015, Wannabe Mutants LLC.
 * All rights reserved.
 *
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  /*
  * State Constants
  */
  NO_ACCOUNT: null,
  GOOGLE_ACCOUNT: null,
  /*
  * Action Constants
  */
  SIGNIN_GOOGLE_USER: null,
  SIGNOUT_USER: null
});
