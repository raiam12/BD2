controllers.controller('menu', ["$scope", "$mdDialog", "$mdBottomSheet",function($scope, $mdDialog, $mdBottomSheet) {

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


	vm.go = function (url) {
		window.location.hash = url;
	};

	vm.checkVoicemail = function() {
	    // This never happens.
	};

    vm.openGrid = function () {
    	$mdBottomSheet.show({
	      templateUrl: 'bottom-sheet-grid-template.html',
	      controller: 'gridCtrl'
	    });
    };

}]);