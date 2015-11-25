var AccountStore = require("./stores/AccountStore.js");
var AccountConstants = require("./constants/AccountConstants.js");

function build_base_request(method, url) {
    var xhr = new XMLHttpRequest();
    //This is to check browser type, IE or not IE.
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}
function build_json_request(method, url) {
    var built_request = build_json_request(method, url);
    built_request.setRequestHeader("Content-Type", "application/json");
    return built_request;
}
module.exports = {
    createJSONRequest: function(method, url) {
        return build_json_request(method, url);
    },
    createIdRequest: function(method, url) {
        var return_request = build_base_request(method, url);
        switch(AccountStore.getState().user_type) {
            case AccountConstants.NO_ACCOUNT:
                // TODO probably add anonymous id
                break;
            case AccountConstants.GOOGLE_ACCOUNT:
                return_request.setRequestHeader("Authorization", "Google " + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
                break;
        };
        return return_request;
    }
}
