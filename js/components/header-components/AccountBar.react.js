
      var account_button = (FlistState.getState().logged_in) ? (<a href="#" onClick={this._logout}>Sign out</a>):(<div id="g-signin2" className="g-signin2"></div>);