var gui = require('nw.gui');
var win = gui.Window.get();

$(document).ready(function(){
  $("#close").click(function(){
    if(confirm("SALIR DEL PROGRAMA"))
      win.close();
  });

  // Initialize collapse button
  $(".button-collapse").sideNav();
  $("#login-btn").click(function(){
    window.location = "./app/app.html";
  });
});
