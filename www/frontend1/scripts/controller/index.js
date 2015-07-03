controllers.controller('LandingCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil','$log', 
		function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
			$scope.toggleLeft = buildToggler('left');
		    $scope.toggleRight = buildToggler('right');



		    var imagePath = 'https://material.angularjs.org/latest/img/list/60.jpeg';
		    $scope.messages = [
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		      {
		        face : imagePath,
		        what: 'Brunch this weekend?',
		        who: 'Min Li Chan',
		        when: '3:08PM',
		        notes: " I'll be in your neighborhood doing errands"
		      },
		    ];
		    /**
		     * Build handler to open/close a SideNav; when animation finishes
		     * report completion in console
		     */
		    function buildToggler(navID) {
		      var debounceFn =  $mdUtil.debounce(function(){
		            $mdSidenav(navID)
		              .toggle()
		              .then(function () {
		                $log.debug("toggle " + navID + " is done");
		              });
		          },300);
		      return debounceFn;
		    }

		    $scope.close = function () {
		      $mdSidenav('left').close()
		        .then(function () {
		          $log.debug("close LEFT is done");
		        });
		    };

		    $scope.close = function () {
		      $mdSidenav('right').close()
		        .then(function () {
		          $log.debug("close RIGHT is done");
		        });
		    };
		}
]);

