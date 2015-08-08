services.service('empleadoService', ['$http','Config', function($http, Config){
	
	this.llamarEmpleados = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"employees/info"
        });
	};

	this.llamarTiposEmpleado = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"employees/getTypes"
        });
	};

	this.insertarEmpleado = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"employees/insert"
        });	
	};

	this.actualizarEmpleado = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"employees/update"
        });	
	};

}]);