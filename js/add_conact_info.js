var contact_info = {
  site_url: "mbech.net"
}

contact_info.add_contact = function(name){
  var nodes = document.getElementsByClassName('site-contact');
  for (var i = 0; i < nodes.length; i ++) {
    var node = nodes[i];
    var parentNode = node.parentNode;
    var email_address = name + "@" + contact_info.site_url;

    node.innerHTML = email_address; 
    parentNode.href = "mailto:" + email_address; 
  }
};

