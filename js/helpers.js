
module.exports = {
	createRequest: function(method, url) {
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
}