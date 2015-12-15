(function(){

  angular
       .module('demo.users')
       .controller('UserController', [
          'userService',
          UserController
       ]);

  function UserController(userService) {

    var self = this;
    this.title = "Modulo de usuarios";
    this.users = [];
    
    userService.get().then(function(data){
      console.log(data);
      self.users = data;
    });

  }

})();