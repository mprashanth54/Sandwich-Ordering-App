
angular.module('myApp').controller('orderCtrl',
  ['$state','$scope',
  function ($state,$scope) {
	  
  $scope.pending =[];
  $scope.complete = function(order){
  		console.log(order);
  }

}]);