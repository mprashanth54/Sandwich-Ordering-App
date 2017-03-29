
angular.module('myApp').controller('userInvoiceCtrl',
  ['$state','$scope','$stateParams','InvoiceService',
  function ($state,$scope,$stateParams,InvoiceService) {
  	console.log($stateParams);
    $scope.invoice = {};
    var refresh = function(){
    	InvoiceService.getInvoiceOne($stateParams.invoice_no).then(function(response){
      		console.log(response);
      		$scope.invoice = response;
    })	
    }
    refresh();
    var socket = io.connect();
    socket.on('broadcast', function(obj) {
    	console.log(obj);
    	if($state.current.name =='user.invoice'){
    		refresh();
    	}
    
  });
    

}]);