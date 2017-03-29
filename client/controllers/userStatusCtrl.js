
angular.module('myApp').controller('userStatusCtrl',
  ['$state','$scope','InvoiceService',
  function ($state,$scope,InvoiceService) {
  	$scope.orders =[];
  	var refresh = function(){
  		InvoiceService.getInvoiceUser().then(function(response){
  			console.log(response);
  			$scope.orders =response;
  		})
  	}
  	refresh();
    var socket = io.connect();
    socket.on('broadcast', function(obj) {
      console.log(obj);
      if($state.current.name =='user.status'){
        refresh();
      }
    
  });
}]);