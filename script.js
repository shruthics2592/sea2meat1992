	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/add', {
				templateUrl : 'pages/add_item.html',
				controller  : 'aboutController'
			})

			
			.when('/lamb', {
				templateUrl : 'pages/lamb.html',
				controller  : 'aboutController'
			})
			.when('/todays_special', {
				templateUrl : 'pages/todays_special.html',
				controller  : 'aboutController'
			})
			.when('/poultry', {
				templateUrl : 'pages/poultry.html',
				controller  : 'aboutController'
			})
			.when('/sausage', {
				templateUrl : 'pages/sausage.html',
				controller  : 'aboutController'
			})
			.when('/beef', {
				templateUrl : 'pages/beef.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,$http) {
		$scope.server = "http://localhost:8082/"
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
		$scope.data = {"username":"","password":""}

		// $http.post($scope.server + 'app/login', $scope.data).success(function(response, status, headers) {
		
		// }).error(function(response, status, headers) {
		
		// });

		$scope.getProducts = function(){
			$http.get($scope.server + 'app/getproduct').success(function(response, status, headers) {
				console.log("product",response)
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getProducts()


	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});