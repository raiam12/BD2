services.service('clienteService', ['$http','Config', function($http, Config){
	
	this.llamarClientes = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"clients/getClients"
        });
	};

	this.insertarCliente = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"clients/insert"
        });	
	};

}]);