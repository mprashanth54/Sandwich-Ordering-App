
angular.module('myApp').controller('categoryCtrl',
  ['$state','$scope','CategoryService',
  function ($state,$scope,CategoryService) {

  $scope.cat = '';
  $scope.status = 'black';
  $scope.list_category =[];
  $scope.message='';
  var refresh = function(){
  	CategoryService.getCategory().then(function(response){
  		console.log(response);
        $scope.list_category = response.data;
    })
  }
  $scope.add = function(){
  	$scope.message='';
  	console.log($scope.cat);
  	CategoryService.save($scope.cat).then(function (response) {
          $scope.message='Added Successfully';
          $scope.status = 'green';
          console.log("Inside then" + $scope.message);
          $scope.cat='';
          refresh();
          
        })
        // handle error
        .catch(function () {
          $scope.status = 'red';
          $scope.message = "Cannot Insert Category";
          $scope.cat = '';
        });
  }

  refresh();

}]);