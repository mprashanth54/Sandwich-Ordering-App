
angular.module('myApp').controller('headerCtrl',
  ['$http','$scope','HeaderService','$timeout',
  function ($http,$scope,HeaderService,$timeout) {
  	var socket = io.connect();
  	$scope.pending=0;
	$scope.users=0;

  	var refresh = function(){
  		HeaderService.getPendingCount().then(function(response){
  			console.log(response.data.length);
  			$scope.pending = response.data.length;
  		});
  		HeaderService.getUserCount().then(function(response){
  			console.log(response);
  			$scope.users = response.length;
  		});

  	}
  	refresh();

  	socket.on('broadcast', function(data){
	  	console.log("Inside broadcast");
	  	refresh();
 	 });
	  
	 $scope.title="Dashboard"; 
	  
	  
	 var curr = new Date; // get current date
		var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
		var last = first + 6; // last day is the first day + 6

		var firstday = (new Date(curr.setDate(first))).getDate();
		var lastday = (new Date(curr.setDate(last))).getDate();
		 
	/******************************
	
	Start Date Widget
	
	******************************/
	
	var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
	$scope.time={};
	var monthNames = ["January", "February", "March", "April", "May", "June",
						  "July", "August", "September", "October", "November", "December"
						];
	function getStuff() {
		$scope.dateValue = new Date();
		$scope.time.hour=$scope.dateValue.getHours()>12?($scope.dateValue.getHours()-12).toString():$scope.dateValue.getHours().toString();
		$scope.time.min=$scope.dateValue.getMinutes()<10?"0"+($scope.dateValue.getMinutes()).toString():$scope.dateValue.getMinutes().toString();
		$scope.time.day=weekday[$scope.dateValue.getDay()];
		$scope.time.today=$scope.dateValue.getDate().toString();
		$scope.time.month=monthNames[$scope.dateValue.getMonth()];
		$scope.time.mon=$scope.dateValue.getMonth().toString();
		$scope.time.year=$scope.dateValue.getFullYear().toString();
		$timeout(getStuff, 5000);
	};
	getStuff();
	
	/*****************************
	
	End of Date Widget
	
	******************************/
	
	
	/*****************************
	
	Start of Daily Widget
	
	******************************/
	

	


}]);