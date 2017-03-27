
angular.module('myApp').controller('userCtrl',
  ['$state','$scope',
  function ($state,$scope) {

  	$scope.title = 'Dashboard';
	  
  	$scope.start = function(){
  		$state.go('user.items');
  	}

}]);