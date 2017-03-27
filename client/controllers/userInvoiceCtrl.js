
angular.module('myApp').controller('userInvoiceCtrl',
  ['$state','$scope','$stateParams','InvoiceService',
  function ($state,$scope,$stateParams,InvoiceService) {
  	console.log($stateParams);
    $scope.invoice = {};
    InvoiceService.getInvoiceOne($stateParams.invoice_no).then(function(response){
      console.log(response);
      $scope.invoice = response;
    })

}]);