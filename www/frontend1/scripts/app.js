angular.module('bd2', [ 
	'materialDatePicker',
	'ui.router', 
	'ngMaterial',
	'bd2.controller',
	'bd2.services',
	'bd2.models'])
.config(function ($stateProvider, $urlRouterProvider, $compileProvider, $mdThemingProvider,$mdIconProvider) {

	$mdIconProvider
	    .iconSet("call", 'images/communication-icons.svg', 24)
	    .iconSet("social", 'images/social-icons.svg', 24);

	$mdThemingProvider.theme('altTheme').primaryPalette('purple');
	$stateProvider.
		state('index', {
			url: '/index',
			templateUrl: '/template/index.html',
			controller: 'LandingCtrl'
		})
		.state('agenda', {
			url: '/agenda',
			templateUrl: '/template/Agenda.html',
			controller: 'agendaCtrl'
		})
		.state('cliente', {
			url: '/cliente',
			templateUrl: '/template/cliente.html',
			controller: 'clienteCtrl'
		})
		.state('mascota', {
			url: '/mascota',
			templateUrl: '/template/mascota.html',
			controller: 'mascotaCtrl'
		})
		.state('articulo', {
			url: '/articulo',
			templateUrl: '/template/articulo.html',
			controller: 'articuloCtrl'
		})
		.state('proveedor', {
			url: '/proveedor',
			templateUrl: '/template/proveedor.html',
			controller: 'proveedorCtrl'
		})
		.state('bodega', {
			url: '/bodega',
			templateUrl: '/template/bodega.html',
			controller: 'bodegaCtrl'
		})
		.state('facturacion', {
			url: '/facturacion',
			templateUrl: '/template/factura.html',
			controller: 'facturaCtrl'
		})
		.state('facturacion.view', {
			url: '/view/:id',
			templateUrl: '/template/factura.tmp.view.html',
			controller:'facturaViewCtrl'
		})
		.state('empleados', {
			url: '/empleados',
			templateUrl: '/template/empleados.html',
			controller: 'empleadoCtrl'
		});

	// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/index');
});

