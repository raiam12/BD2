angular.module('bd2', [ 'ui.router'])
.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {

	$stateProvider.
		state('index', {
			url: '/index',
			templateUrl: '/template/index.html'
		});

	// if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/index');
});

