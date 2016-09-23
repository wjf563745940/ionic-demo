define(['app'],function(app){
	'use strict';
	function ctrl($scope){

		$scope.setting={ 
			enableFriends:true
		};
	}
	ctrl.$inject=['$scope'];
	app.registerController('testCtrl',ctrl);

})