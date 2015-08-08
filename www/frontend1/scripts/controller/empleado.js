controllers.controller('empleadoCtrl', ['$scope', '$timeout', '$filter', '$mdDialog','empleadoService', function($scope, $timeout, $filter, $mdDialog, empleadoService){
	$scope.employees = [];
	$scope.project = {}
	$scope.selectedG = [];
	$scope.typeEmployees = [];
	$scope.groups = [];
	$scope.index = 6;
	$scope.states = [
		{abbrev:'S'},
		{abbrev:'C'},
		{abbrev:'D'}
	];
	
	empleadoService.llamarEmpleados().then(function(e){
		$timeout(function(){
			$scope.employees = e.data.dataModel;
			parseResult();
		}, 2000);
	});

	empleadoService.llamarTiposEmpleado().then(function(e){
			$scope.typeEmployees = e.data.dataModel;
	});

	$scope.change = function (index) {
		$scope.selectedG = $scope.groups[index];
	};
	
	$scope.send = function (model) {
		empleadoService.insertarEmpleado(model).then(function(e){
			if (!e.data.hasError) {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title('Enhorabuena')
			        .content('Hemos recibido tu informacion')
			        .ariaLabel('Alert Dialog Demo')
			        .ok('Aceptar!')
			    );
			} else{
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title('Hubo un error')
			        .content('La descripcion del mismo es:<br><code>'+e.data.message+'</code>')
			        .ariaLabel('Error')
			        .ok('Aceptar!')
			    );
			}
		}, function(e){
			console.log(e);
		});

	};


	$scope.actualizar = function(ide) {
		$mdDialog.show({
			templateUrl: '/template/update-employee.html',
		    parent: angular.element(document.body),
		    controller: 'actualizarCtrl',
		    locals: {
		    	id: ide,
		    	types: $scope.typeEmployees,
		    	state: $scope.states
		    }
		});
	};

 	var deleteNodes = function (count) {
 		var limit = count >= $scope.index ? $scope.index: count;
		$scope.groups.push($filter('limitTo')($scope.employees,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.employees.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.employees.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.employees.length);
		}
		$scope.change(0);
 	};

}]);


controllers.controller('actualizarCtrl',function($scope, $mdDialog, $filter, id, types, state, empleadoService){
	$scope.project = {};
	$scope.typeEmployees = types;
	$scope.states = state;
	
	empleadoService.llamarEmpleados().then(function(e){
		angular.forEach(e.data.dataModel, function (value) {
			if (value.codEmpleado == id) {
				value.fecha_ing = new Date(value.fecha_ing);
				angular.extend($scope.project, value);
			}
		});
		console.log($scope.project);
	});
	$scope.cancel = function() {
	    $mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	};
	$scope.actualizar = function (model) {
		console.log(model);
		empleadoService.actualizarEmpleado(model).then(function(e){
			if (!e.data.hasError) {
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title('Enhorabuena')
			        .content('Hemos recibido tu informacion')
			        .ariaLabel('Alert Dialog Demo')
			        .ok('Aceptar!')
			    );
			} else{
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .title('Hubo un error')
			        .content('La descripcion del mismo es:<br><code>'+e.data.message+'</code>')
			        .ariaLabel('Error')
			        .ok('Aceptar!')
			    );
			}
		}, function(e){
			console.log(e);
		});

	};

});