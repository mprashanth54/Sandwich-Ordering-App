var myApp = angular.module('myApp', ['ui.router','ngFileUpload']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('login');

  $stateProvider
    .state('admin', {
      url:'/admin',
      templateUrl: 'partials/home.html',
      controller:'adminCtrl',
      access: {restricted: true, access:'admin'}
    })
    .state('user', {
      url:'/user',
      templateUrl: 'partials/user.html',
      access: {restricted: true, access:'user'}
    })
    .state('login', {
      url:'/login',
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .state('logout', {
      url:'/logout',
      controller: 'logoutController',
      access: {restricted: true}
    })
    .state('register', {
      url:'/register',
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .state('admin.dashboard', {
      url: '/dashboard',
      views: {

            // the main template will be placed here (relatively named)
      '': {  
        templateUrl: 'partials/dashboard.html'
      },
      
      'header@admin.dashboard': {  
        templateUrl: 'partials/dashboard.headers.html',
        controller:'headerCtrl'
      },
      'orders@admin.dashboard': {  
        templateUrl: 'partials/dashboard.orders.html',
        controller:'orderCtrl'
      }
    },

    access:{restricted: true, access:'admin'}
 
    })
    .state('admin.category', {
      url:'/category',
      templateUrl: 'partials/category.html',
      controller:'categoryCtrl',
      access: {restricted: true, access:'admin'}
    })
    .state('admin.items', {
      url:'/items',
      templateUrl: 'partials/items.html',
      controller:'itemCtrl',
      access: {restricted: true, access:'admin'}
    })
    .state('admin.orders', {
      url:'/orders',
      templateUrl: 'partials/orders.html',
      controller:'orderViewCtrl',
      access: {restricted: true, access:'admin'}
    })
    
});

myApp.run(function ($rootScope,$state,$stateParams, AuthService) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
      AuthService.getUserStatus()
      .then(function(){
        
        if (toState.access.restricted && (!AuthService.isLoggedIn() || !AuthService.checkRoute(toState.access.access))){
          $state.go('login');
          event.preventDefault();
        }
      });
  });
});