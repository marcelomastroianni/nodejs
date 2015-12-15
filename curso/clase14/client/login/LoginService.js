//En angular se suele encampular las peticiones http en algo que se llama service.

(function(){
  'use strict';

  angular.module('demo.login')
         .service('loginService', ['$http', LoginService]);

  function LoginService($http){
    
    var loginURI = 'http://localhost:3000/users/login';
    
    this.login = function(data) {
      return $http.post(loginURI, data).then(function(res){
        return res.data;
      });
    }

  }

})();
