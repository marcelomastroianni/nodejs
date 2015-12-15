angular

  .module('demo', [
    'demo.users',
    'demo.login',
    'demo.auth',
    'ui.router',
    'angular-storage',
    'angular-jwt'
  ])

  .config(function($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider){

    $stateProvider
    
      .state("login", {
        url : "/login",
        templateUrl : "login/view/login.html",
        controller : "LoginController",
        controllerAs : "login",
        authenticate: false
      })
      .state("logout", {
        url : "/logout",
        controller : "LogoutController",
        controllerAs : "logout",
        authenticate: false
      })
      .state("users", {
        url : "/usuarios",
        templateUrl : "users/view/users.html",
        controller : "UserController",
        controllerAs : "user",
        authenticate: true,
        validTypes: ['superadmin', 'admin']
      });

    $urlRouterProvider.otherwise("/login");

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
  })

  .run(function ($rootScope, $state, authService, store) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !authService.isAuthenticated()){
        event.preventDefault();
        $state.transitionTo("login");  
      }
    });
  });