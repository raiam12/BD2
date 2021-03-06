angular.module('bd2', [ 
	'ui.router', 
	'ngMaterial',
	'bd2.controller'])
.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

	$stateProvider.
		state('index', {
			url: '/index',
			templateUrl: '/template/index.html',
			controller: 'LandingCtrl'
		})
		.state('empleados', {
			url: '/empleados',
			templateUrl: '/template/empleados.html'
		});

	// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/index');
});

