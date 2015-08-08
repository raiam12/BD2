controllers.controller('clienteCtrl', ['$scope', '$timeout', '$filter', '$mdDialog','clienteService', function($scope, $timeout, $filter, $mdDialog, clienteService){
	$scope.clientes = [];
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
		$timeout(function(){
			$scope.clientes = e.data.dataModel;
			parseResult();
		}, 2000);
	});

	$scope.send = function (model) {
		clienteService.insertarCliente(model).then(function(e){
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
		$scope.groups.push($filter('limitTo')($scope.clientes,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.clientes.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.clientes.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.clientes.length);
		}
		$scope.change(0);
 	};

}]);