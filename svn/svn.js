var svn = require("svn-interface");

var url_repositorio ='http://127.0.0.1:5420/svn/windows/branches/ruta_svn/ruta_svn' ;
var carpeta_destino = "./tmp_";
var opciones = {r:'575'} // Numero de revision 575


svn.checkout (url_repositorio, carpeta_destino, opciones, function(err){

	console.log("completed");

});