
angular.module('myApp').controller('orderCtrl',
  ['$state','$scope','InvoiceService',
  function ($state,$scope,InvoiceService) {
  	var socket = io.connect();
  	$scope.pending =[];
  	var refresh = function(){
  		InvoiceService.getInvoicePlaced().then(function(response){
  			console.log(response);
  			$scope.pending =response;
  		})
  	}
  	refresh();

  socket.on('broadcast', function(data){
  	console.log("Inside broadcast");
  	refresh();
  });

  
  $scope.complete = function(order){
  		console.log(order);
  		InvoiceService.complete(order).then(function(){
  			var data = "Change occured";
  			refresh();
  			socket.emit('broadcast', data);
  		})
  }

}]);