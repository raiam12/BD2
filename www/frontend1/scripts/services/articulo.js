services.service('articuloService', ['$http','Config', function($http, Config){
	
	this.llamarArticulos = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Articulo/getArticulos"
        });
	};

	this.insertarArticulos = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Articulo/insert"
        });	
	};
	
}]);