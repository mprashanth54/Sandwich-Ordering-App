
angular.module('myApp').controller('adminCtrl',
  ['$state','$scope',
  function ($state,$scope) {

  	$scope.title = 'Dashboard';
	  
  	$scope.start = function(){
  		$state.go('admin.dashboard');
  	}

}]);