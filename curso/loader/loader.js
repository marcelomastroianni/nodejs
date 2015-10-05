var fs = require('fs');
//Se guarda una referencia al require original
var originalRequire = require;

function loadModule(filename, module, require) {
  var wrappedSrc = 
    '(function(module, exports, require) {' +
      fs.readFileSync(filename, 'utf8') +
    '})(module, module.exports, require);';
  eval(wrappedSrc);
}

var require = function(moduleName) { 
  console.log('Homemade require invoked for module: ' + moduleName); 
  var id = require.resolve(moduleName); 
  if(require.cache[id]) { 
    return require.cache[id].exports; 
  } 
 
  //Metadata del modulo 
  var module = { 
    exports: {}, 
    id: id 
  };
    
  //Se actualiza cache
  require.cache[id] = module;

  //Se carga y ejecuta el codigo del modulo 
  loadModule(id, module, require);
  
  //Se retornan variables exportadas 
  return module.exports; 
}; 

require.cache = {};
require.resolve = function(moduleName) {
  //Se reutiliza el algoritmo original de resolve
  return originalRequire.resolve(moduleName);
}

//Se utiliza la nueva función require para cargar el 
//punto de entrada de la aplicación.
require(process.argv[2]);
