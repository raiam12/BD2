controllers.controller('proveedorCtrl', ['$scope', '$timeout', '$filter', '$mdDialog','proveedorService', function($scope, $timeout, $filter, $mdDialog, proveedorCtrl){
	$scope.proveedor = [];
	$scope.project = {}
	$scope.selectedG = [];
	$scope.typeEmployees = [];
	$scope.groups = [];
	$scope.index = 8;
	
	proveedorCtrl.llamarProveedores().then(function(e){
		$timeout(function(){
			$scope.proveedor = e.data.dataModel;
			parseResult();
		}, 2000);
	});


	$scope.change = function (index) {
		$scope.selectedG = $scope.groups[index];
	};
	
	$scope.send = function (model) {
		proveedorCtrl.insertarProveedor(model).then(function(e){
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
		$scope.groups.push($filter('limitTo')($scope.proveedor,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.proveedor.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.proveedor.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.proveedor.length);
		}
		$scope.change(0);
 	};

}]);