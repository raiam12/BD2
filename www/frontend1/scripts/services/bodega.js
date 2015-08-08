services.service('bodegaService', ['$http','Config', function($http, Config){
	
	this.llamarBodegas = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Bodega/getBodega"
        });
	};

	this.insertarBodega = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Bodega/insert"
        });	
	};
	
}]);