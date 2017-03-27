
angular.module('myApp').controller('userItemsCtrl',
  ['$state','$scope','ItemsService','CategoryService','InvoiceService',
  function ($state,$scope,ItemsService,CategoryService,InvoiceService) {
    var socket = io.connect();
  	$scope.category = [];
  	$scope.items = [];
  	CategoryService.getCategory().then(function(response){
  		$scope.category = response.data;
  	})
  	ItemsService.getItems().then(function(response){
  		$scope.items = response.data;
  	})

  	$scope.order = function(order){
  		console.log(order);
  		InvoiceService.newInvoice(order).then(function(response){
  			console.log(response);
        socket.emit('broadcast', 'Data changed');
  			$state.go('user.invoice',{invoice_no:response});
  		})

  	}

}]);