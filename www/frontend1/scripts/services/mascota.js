services.service('mascotaService', ['$http','Config', function($http, Config){
	
	this.llamarAnimales = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Mascotas/getPets"
        });
	};

	this.insertarAnimal = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Mascotas/insert"
        });	
	};

}]);