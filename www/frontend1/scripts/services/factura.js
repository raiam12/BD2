services.service('facturaService', ['$http','Config', function($http, Config){
	
	this.obtenerFacturas = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Factura/getFacturas"
        });
	};

	this.obtenerFacturaPorId = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Factura/getFacturaById"
        });
	};

	this.insertarFactura = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Factura/insert"
        });
	};

	this.insertarDetalle = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Factura/insertDetalle"
        });
	};

	this.getDetalleByFactura = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Factura/getDetalleByFactura"
        });	
	};

}]);