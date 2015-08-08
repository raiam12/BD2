services.service('agendaService', ['$http','Config', '$q', function($http, Config, $q){
	
	this.llamarCitas = function () {
		return $http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Agenda/getCitas"
        });
	};

	this.insertarCitas = function (data) {
		return $http({
			cache: false,
			params: data,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Agenda/insert"
        });	
	};

	this.llamarCitaPorFecha = function (data) {
		var defer = $q.defer();
		$http({
			cache: false,
            method: 'get',
            responseType: 'json',
            url: Config.server+"Agenda/getCitasByDate?fecha="+data
        }).then(function(e){
        	defer.resolve(parseResult(e.data.dataModel));
        });	

        return defer.promise;
	};


	function parseResult (data){
		var hours = 9;
		var starting = 8;
		var model = [];
		for (var x = starting; x < (starting + hours); x++) {
			var volatil = {};	
			for (var y = 0; y < 60; y+=30) {
				volatil = {
					hours: x,
					minutes: y,
					busy: false
				};
				for (item in data) {
					if (data[item].hora == x && data[item].minutos == y) {
						angular.extend(volatil, {
							busy: true,
							model: data[item]
						});
					}
				}
				model.push(volatil);
			}
			
		}
		return model;

	}

}]);