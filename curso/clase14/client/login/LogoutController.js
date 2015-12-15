(function(){

  angular
       .module('demo.login')
       .controller('LogoutController', [
          'loginService',
          'store',
          '$state',
          LogoutController
       ]);

  function LogoutController( loginService, store, $state ) {

    var self = this;
    
    this.logout = function(){
      store.remove('jwt');
      $state.transitionTo("login");
    }
    
    this.logout();
  }

})();
