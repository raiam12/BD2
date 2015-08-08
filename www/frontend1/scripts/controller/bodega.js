controllers.controller('bodegaCtrl', ['$scope', '$timeout', '$filter', '$mdDialog','bodegaService', function($scope, $timeout, $filter, $mdDialog, bodegaCtrl){
	$scope.bodega = [];
	$scope.project = {}
	$scope.selectedG = [];
	$scope.typeEmployees = [];
	$scope.groups = [];
	$scope.index = 8;
	
	bodegaCtrl.llamarBodegas().then(function(e){
		$timeout(function(){
			$scope.bodega = e.data.dataModel;
			parseResult();
		}, 2000);
	}).catch(function(e) {
		console.log(e);
	});


	$scope.change = function (index) {
		$scope.selectedG = $scope.groups[index];
	};
	
	$scope.send = function (model) {
		bodegaCtrl.insertarBodega(model).then(function(e){
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
		$scope.groups.push($filter('limitTo')($scope.bodega,limit));
 		for (var x = 0; x < limit; x++) {
 			$scope.bodega.shift();
 		}
 	};

	var parseResult = function () {
		var indexes = Math.ceil($scope.bodega.length / $scope.index);
		for (var x = 0; x < indexes; x ++) {
			deleteNodes($scope.bodega.length);
		}
		$scope.change(0);
 	};

}]);