
angular.module('myApp').controller('orderViewCtrl',
  ['$state','$scope','InvoiceService',
  function ($state,$scope,InvoiceService) {

  $scope.orders = [];

  InvoiceService.getAllInvoices().then(function(response){
    $scope.orders = response;
  })


}]);