controllers.controller('menu', ["$scope", "$mdDialog", function($scope, $mdDialog) {

	var vm = this;
	vm.notificationsEnabled = true;
	
	vm.toggleNotifications = function() {
	    vm.notificationsEnabled = !vm.notificationsEnabled;
	  };
	
	vm.redial = function(e) {
	  	console.log(e);
	    $mdDialog.show(
	      $mdDialog.alert()
	        .title('No puedes.')
	        .content('No tienes acceso a esta opcion.')
	        .ok('Gracias')
	    );
	};
	vm.checkVoicemail = function() {
	    // This never happens.
	};

}]);