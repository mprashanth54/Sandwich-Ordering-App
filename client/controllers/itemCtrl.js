
angular.module('myApp').controller('itemCtrl',
  ['$state','$scope','CategoryService','ItemsService','Upload',
  function ($state,$scope,CategoryService,ItemsService,Upload) {

 $scope.items=[];
 $scope.status = 'black';
 $scope.message='';
 $scope.add = false;
 $scope.category = [];
var refresh=function(){
  CategoryService.getCategory().then(function(response){
    $scope.category = response.data;
  })
  ItemsService.getItems().then(function(response){
    $scope.items = response.data;
  })

}

refresh();

 $scope.submitForm= function(isValid){
  if(isValid){
    console.log("Inside Form Submit");
    console.log($scope.item);
    ItemsService.save($scope.item).then(function (response) {
          $scope.message='Added Successfully';
          $scope.status = 'green';
          console.log("Inside then" + $scope.message);
          $scope.item='';
          refresh();
          
        })
        // handle error
        .catch(function () {
          $scope.status = 'red';
          $scope.message = "Cannot Insert Category";
          $scope.item = '';
        });
  }
 }


 $scope.deleteItem = function(item){
  console.log(item._id);
  ItemsService.deleteItem(item._id).then(function(){
      refresh();
  })
 }



}]);