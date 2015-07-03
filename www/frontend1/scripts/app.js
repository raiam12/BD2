angular.module('bd2', [ 
	'ui.router', 
	'ngMaterial',
	'bd2.controller'])
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
		.state('empleados', {
			url: '/empleados',
			templateUrl: '/template/empleados.html'
		});

	// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/index');
});

