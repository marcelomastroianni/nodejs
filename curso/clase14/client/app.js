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

    
    jwtInterceptorProvider.tokenGetter = function(store) { //Aca configura a donde va a guardar el web token. Puede guardarse en las coookies, o en este caso en el local storage, es decir en el navegador.
      return store.get('jwt');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
  })

  .run(function ($rootScope, $state, authService, store) {
    //Este evento se dispara cada vez que un usuario cambia la url del navegador
    //Y loq ue se hace es checkear si estamos authenticados.
    //Basicamente es ir a buscar el token al LocalStore y ver si el token sigue siendo valido.
    //Si no esta el token en el LocalStorage, o bien esta pero esta vencido, entonces me redirecciona al login.
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !authService.isAuthenticated()){
        event.preventDefault();
        $state.transitionTo("login");  
      }
    });
  });