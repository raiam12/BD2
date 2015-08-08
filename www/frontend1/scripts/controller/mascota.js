controllers.controller('mascotaCtrl', ['$scope', '$timeout', '$filter', '$mdDialog','clienteService', 'mascotaService', function($scope, $timeout, $filter, $mdDialog, clienteService, mascotaService){
	$scope.clientes = [];
	$scope.pets = [];
	$scope.project = {}
	$scope.selectedG = [];
	$scope.groups = [];
	$scope.index = 8;
	$scope.states = [
		{abbrev:'Solter@'},
		{abbrev:'Casad@'},
		{abbrev:'Divorciad@'}
	];
	
	clienteService.llamarClientes().then(function(e){
		$scope.clientes = e.data.dataModel;
	});

	mascotaService.llamarAnimales().then(function(e){
		$timeout(function(){
			$scope.pets = e.data.dataModel;
			parseResult();
		}, 2000);
	});

	$scope.parseEmail = function (model) {
		angular.forEach($scope.clientes, function (value) {
			if (value.codCliente == model.codDueno) {
				model.nombreDueno = value.email;
			}
		});

		return model;
	};

	$scope.send = function (model) {
		model = $scope.parseEmail(model);
		mascotaService.insertarAnimal(model).then(function(e){
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
			        .content('La descripcion del mismo es: '+e.data.message)
			        .ariaLabel('Error')
			        .ok('Aceptar!')
			    );
			}
		}, function(e){
			console.log(e);
		});

	};

	$scope.change = function (index) {
		$scope.selectedG = $scope.groups[index];
	};

 	var deleteNodes = function (count) {
 		var limit = count >= $scope.index ? $scope.index: count;
		$scope.groups.push($filter('limitTo')($scope.pets,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.pets.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.pets.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.pets.length);
		}
		$scope.change(0);
 	};

}]);