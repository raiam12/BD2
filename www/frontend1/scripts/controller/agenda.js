controllers.controller('agendaCtrl', ['$scope', '$timeout', '$stateParams','$filter', '$mdDialog','facturaService', function($scope, $timeout, $stateparams, $filter, $mdDialog,facturaService){
	$scope.factura = [];
	$scope.detalles = [];

	$scope.header = {
        monday: 'Lun',
        tuesday: 'Mar',
        wednesday: 'Mie',
        thursday: 'Jue',
        friday: 'Vier',
        saturday: 'Sab',
        sunday: 'Dom',
    }

    $scope.click = function (model) {
    	$mdDialog.show({
	      templateUrl: '/template/opciones-agenda.html',
	      parent: angular.element(document.body),
	      controller: 'opcionesCtrl',
	      locals: {
	      	date: model
	      }
	    }).then(function(e){
	    	if (e == 1) {
	    		$mdDialog.show({
			      templateUrl: '/template/nueva-cita.html',
			      parent: angular.element(document.body),
			      controller: 'nuevaCitaCtrl',
			      locals: {
			      	date: model
			      }
			    });
	    	} else {
	    		$mdDialog.show({
			      templateUrl: '/template/lista-agenda.html',
			      parent: angular.element(document.body),
			      controller: 'listaAgendaCtrl',
			      locals: {
			      	date: model
			      }
			    });
	    	}
	    	console.log(e);
	    });
	    $scope.date = model;
    };	

    $scope.arrows = {
        year: {
            left: 'images/white_arrow_left.svg',
            right: 'images/white_arrow_right.svg'
        },
        month: {
            left: 'images/grey_arrow_left.svg',
            right: 'images/grey_arrow_right.svg'
        }
    };

    $scope.visible = true;
}]);

controllers.controller('opcionesCtrl',function($scope, $mdDialog, date){
	
	$scope.date = date;
	$scope.hideOption = false;
	$scope.open = true;
	$scope.cancel = function() {
	    $mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	};

	window.d = date;

	(function validateOpts() {
		var today = new Date();
		var pickedDate = new Date(date);

		if (pickedDate.getDay() == 0) {
			$scope.open = false;
		} else

		if (today.toString() != pickedDate.toString()) {
			if (today > pickedDate) {
				$scope.hideOption = true;
			}
		}
	})();
});


controllers.controller('listaAgendaCtrl',function($scope, $mdDialog, date, agendaService){
	var fecha = new Date(date);
	window.fecha = fecha;
	var compute =  (fecha.getMonth() + 1)  + "/" + fecha.getDate()+ "/" +fecha.getFullYear();
	agendaService.llamarCitaPorFecha(compute).then(function(e){
		$scope.citas = e;
	});
	$scope.cancel = function() {
	    $mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	};
});

controllers.controller('nuevaCitaCtrl',function($scope, $mdDialog, date, mascotaService, agendaService){
	$scope.project = {
		fecha : date
	};

	mascotaService.llamarAnimales().then(function(e){
		$scope.mascotas = e.data.dataModel;
	});
	$scope.cancel = function() {
	    $mdDialog.cancel();
	};
	$scope.createCita = function () {
		console.log($scope.project);
		agendaService.insertarCitas($scope.project).then(function (e) {
			$mdDialog.hide();
			if (e.data.hasError == false) {
 				$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.body))
					        .title('Enhorabuena')
					        .content('Hemos recibido tu informacion')
					        .ariaLabel('Alert Dialog Demo')
					        .ok('Aceptar!')
					    );
			} else {
				$mdDialog.show(
				$mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title('Hubo un error')
			        .content('La descripcion del mismo es: '+e.data.message)
			        .ariaLabel('Error')
			        .ok('Aceptar!'));
			}
			console.log(e);
		});
	};
});