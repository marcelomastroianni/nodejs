(function(){
  'use strict';

  angular.module('demo.users')
         .service('userService', ['$http', UserService]);

  function UserService($http){
    
    var usersURI = 'http://localhost:3000/users';
    
    this.get = function(data) {
      return $http.get(usersURI).then(function(res){
        return res.data;
      });
    }

  }

})();