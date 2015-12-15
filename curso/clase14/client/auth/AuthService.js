(function(){
  'use strict';

  angular.module('demo.auth')
         .service('authService', ['store', 'jwtHelper', AuthService]);

  function AuthService(store, jwtHelper){

    this.isAuthenticated = function(){
      return store.get('jwt') && !jwtHelper.isTokenExpired(store.get('jwt'));
    }
    
  }

})();