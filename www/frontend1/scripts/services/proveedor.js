services.service('proveedorService', ['$http','Config', function($http, Config){
	
	this.llamarProveedores = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Proveedor/getProveedor"
        });
	};

	this.insertarProveedor = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Proveedor/insert"
        });	
	};
	
}]);