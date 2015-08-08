controllers.controller('facturaCtrl', ['$scope', '$timeout', '$filter', '$mdDialog', '$filter','facturaService', 'articuloService', 'clienteService', function($scope, $timeout, $filter, $mdDialog, $filter, facturaService, articuloService,clienteService){
	$scope.factura = [];
	$scope.project = {}
	$scope.selectedG = [];
	$scope.typeEmployees = [];
	$scope.groups = [];
	$scope.index = 6;
	$scope.repos = [];
    $scope.querySearch   = querySearch;
    $scope.quantity = 2;
    $scope.project.detalle = [];

	function querySearch (query) {
      var results = query ? $scope.repos.filter( createFilterFor(query) ) : $scope.repos;
        return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };
    }

    clienteService.llamarClientes().then(function(e){
		$scope.clientes = e.data.dataModel;
	});

	articuloService.llamarArticulos().then(function(e){
		$scope.repos = e.data.dataModel;
		$scope.repos.map( function (repo) {
	        repo.value = repo.nombre.toLowerCase();
	        return repo;
	    });
	    $scope.repos = $filter('filter')($scope.repos, {activo:'SI'})
	});

	facturaService.obtenerFacturas().then(function(e){
		$timeout(function(){
			$scope.factura = e.data.dataModel
			parseResult();
		}, 2000);
	});

	$scope.change = function (index) {
		$scope.selectedG = $scope.groups[index];
	};

	$scope.delete = function (index) {
		$scope.project.detalle.splice(index,1);
		$scope.quantity --;
	};

	$scope.add = function () {
		$scope.quantity++;
	};
	$scope.orderTotal = function () {
		$scope.project.total = 0;
		if ($scope.project.detalle.length > 0) {
			angular.forEach($scope.project.detalle, function (value) {
				if (typeof value.cantidadAPedir == "undefined" || typeof value.precio == "undefined") {

				} else {
					$scope.project.total += (value.cantidadAPedir * value.precio)
				}
			});
		}
	};
	
	$scope.send = function () {
		var facturaModel = {
			cliente: $scope.project.codDueno,
			total: $scope.project.total, 
			empleado: 6
		};
		facturaService.insertarFactura(facturaModel).then(function(e){
			if (!e.data.hasError) {
				angular.forEach($scope.project.detalle, function (value) {
					var detalleModel = {
						cantidad : value.cantidadAPedir,
						precio : value.precioTotal,
						articulo : value.codarticulo,
						numfact : e.data.dataModel[0].numFact
					};
					facturaService.insertarDetalle(detalleModel).then(function (e) {
						$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.body))
					        .title('Enhorabuena')
					        .content('Hemos recibido tu informacion')
					        .ariaLabel('Alert Dialog Demo')
					        .ok('Aceptar!')
					    );
					});
				});
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

	$scope.itemChange = function (e, model) {
		if (typeof $scope.project.detalle[e] == "undefined") {
			$scope.project.detalle[e] = model;
		} else {
			angular.extend($scope.project.detalle[e], model);
		}

		if (typeof $scope.project.detalle[e].cantidadAPedir == "undefined") {
			$scope.project.detalle[e].cantidadAPedir = 0;
		}

		$scope.project.detalle[e].precioTotal = $scope.project.detalle[e].cantidadAPedir * $scope.project.detalle[e].precio; 
	};

	$scope.range = function() {
    	return new Array($scope.quantity);   
	};

 	var deleteNodes = function (count) {
 		var limit = count >= $scope.index ? $scope.index: count;
		$scope.groups.push($filter('limitTo')($scope.factura,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.factura.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.factura.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.factura.length);
		}
		$scope.change(0);
 	};

}]);