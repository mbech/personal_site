var contact_info = {
   site_url: "mbech.net"
}

contact_info.add_contact = function(name){
  var nodes = document.getElementsByClassName('site-contact');
  var node = nodes[0];

  node.innerHTML =  name + "@" + contact_info.site_url;

};

