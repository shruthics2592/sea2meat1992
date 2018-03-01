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
			})

			// route for the login page
			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})

			// ----------- when register ---------- //
			.when('/register', {
				templateUrl : 'pages/register.html',
				controller  : 'registerController'
			});

			
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,$http) {
		//----------- Main Slider Setttings -------------- //
		$('#slideshow0').owlCarousel({
			items: 6,
			autoPlay: 3000,
			singleItem: true,
			navigation: true,
			navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
			pagination: false
		  });

		//------------- Brnad Slider Settings -------------- //
		$('#brand-logo').owlCarousel({
            items: 4,
            autoPlay: 3000,
            navigation: true,
            navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
            pagination: false
		  });
		  
		//------------ Client Testimony Slider ----------------- //
		
		$('#client').owlCarousel({
            items: 1,
            autoPlay: 3000,
            navigation: true,
            navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
            pagination: false
		  });


		$scope.server = "http://localhost:8082/"
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';

		

		$scope.getProducts = function(){
			$http.get($scope.server + 'app/getproduct').success(function(response, status, headers) {
				console.log("product",response)
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getProducts()


	});

	scotchApp.controller('aboutController', function($scope,$http) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('registerController', function($scope,$http) {
		console.log("I am in register controller")
		$scope.registerData = {"firstName":"","lastName":"","mobile":"","fax":"","email":"","company":"","subscription":""}
		

		$scope.login = function(){
			$http.post($scope.server + 'app/login', $scope.data).success(function(response, status, headers) {
				
			}).error(function(response, status, headers) {
			
			});

		}

		$scope.registerUser = function(){
			$http.post($scope.server + 'app/register', $scope.registerData).success(function(response, status, headers) {
				
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('loginController', function($scope,$http) {
		console.log("I am in login controller")
		$scope.data = {"email":"","password":""}
		$scope.server = "http://localhost:8081/";


		$scope.login = function(){

			$http.post($scope.server + 'app/login', $scope.data).success(function(response, status, headers) {
				console.log("after api call",response)

			}).error(function(response, status, headers) {
			
			});

		}

	
	});


	