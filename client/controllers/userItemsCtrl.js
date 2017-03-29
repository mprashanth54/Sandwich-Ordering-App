
angular.module('myApp').controller('userItemsCtrl',
  ['$state','$scope','ItemsService','CategoryService','InvoiceService',
  function ($state,$scope,ItemsService,CategoryService,InvoiceService) {
    var socket = io.connect();
  	$scope.category = [];
    $scope.sel_item=[];
    $scope.add=false;
  	$scope.items = [];
  	CategoryService.getCategory().then(function(response){
  		$scope.category = response.data;
  	})
  	ItemsService.getItems().then(function(response){
  		$scope.items = response.data;
  	})

    $scope.selectedOrder = function(item){
      $scope.add=!$scope.add;
      $scope.sel_item=item;
    }

    $scope.check
    $scope.back = function(){
      event.preventDefault();
      $scope.add=!$scope.add;
      $scope.sel_item=[];
    }

  	$scope.order = function(){
      var order = $scope.sel_item;
  		console.log(order);
  		InvoiceService.newInvoice(order).then(function(response){
  			console.log(response);
        socket.emit('broadcast', 'Data changed');
  			$state.go('user.invoice',{invoice_no:response});
  		})

  	}

}]);