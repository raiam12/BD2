controllers.controller('articuloCtrl', ['$scope', '$timeout', '$filter', '$mdDialog','articuloService','bodegaService', 'proveedorService', function($scope, $timeout, $filter, $mdDialog, articuloService, bodegaService,proveedorService){
	$scope.articulo = [];
	$scope.project = {}
	$scope.selectedG = [];
	$scope.typeEmployees = [];
	$scope.groups = [];
	$scope.index = 8;
	$scope.estados = ["N","V"];
	$scope.activo = ["SI","NO"];
	
	articuloService.llamarArticulos().then(function(e){
		$timeout(function(){
			$scope.articulo = e.data.dataModel;
			console.log($scope.articulo);
			parseResult();
		}, 2000);
	});

	bodegaService.llamarBodegas().then(function(e){
		$scope.bodega = e.data.dataModel;
	});

	proveedorService.llamarProveedores().then(function(e){
		$scope.proveedor = e.data.dataModel;
	});

	$scope.change = function (index) {
		$scope.selectedG = $scope.groups[index];
	};
	
	$scope.send = function (model) {
		console.log(model);
		articuloService.insertarArticulos(model).then(function(e){
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

 	var deleteNodes = function (count) {
 		var limit = count >= $scope.index ? $scope.index: count;
		$scope.groups.push($filter('limitTo')($scope.articulo,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.articulo.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.articulo.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.articulo.length);
		}
		$scope.change(0);
 	};

}]);