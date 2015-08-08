controllers.controller('facturaViewCtrl', ['$scope', '$timeout', '$stateParams','$filter', '$mdDialog','facturaService', function($scope, $timeout, $stateparams, $filter, $mdDialog,facturaService){
	$mdDialog.show({
      controller: 'facturaEditDialog',
      templateUrl: '/template/tmp.html',
      parent: angular.element(document.body),
    })
	
}]);


controllers.controller('facturaEditDialog', ['$scope', '$timeout', '$stateParams','$filter', '$mdDialog','facturaService', function($scope, $timeout, $stateparams, $filter, $mdDialog,facturaService){
	$scope.factura = [];
	$scope.detalles = [];


	facturaService.obtenerFacturaPorId($stateparams).then(function(e){
		$scope.factura = e.data.dataModel[0];
	});

	facturaService.getDetalleByFactura($stateparams).then(function(e){
		$scope.detalles = e.data.dataModel;
	});
	
	$scope.close = function () {
		$mdDialog.cancel();
	};

}]);

