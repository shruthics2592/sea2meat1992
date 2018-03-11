	// create the module and name it scotchApp
	var adminApp = angular.module('adminApp', ['ngRoute']);

	// configure our routes
	adminApp.config(function($routeProvider) {
		$routeProvider
			
			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'homeController'
            })
            
            .when('/product', {
				templateUrl : 'pages/product.html',
				controller  : 'productController'
            })
            
            .when('/customer', {
				templateUrl : 'pages/customer.html',
				controller  : 'customerController'
            })
            
            .when('/brands', {
				templateUrl : 'pages/brands.html',
				controller  : 'brandsController'
            })

            .when('/users', {
				templateUrl : 'pages/users.html',
				controller  : 'usersController'
            })
            
            .when('/orders', {
				templateUrl : 'pages/users.html',
				controller  : 'usersController'
            })
            .when('/banners', {
				templateUrl : 'pages/banner.html',
				controller  : 'bannersController'
			});

			
    });
    
  
    
    adminApp.controller('homeController', function($scope,$window,$http) {
		$scope.message = 'in home controller';
	
    });

    adminApp.controller('productController', function($scope,$window,$http) {
		$scope.message = 'in product controller';
	
    });

    adminApp.controller('customerController', function($scope,$window,$http) {
		$scope.message = 'in customer controller';
	
    });

    adminApp.controller('brandsController', function($scope,$window,$http) {
		$scope.message = 'in brands controller';
	
    });

    adminApp.controller('bannersController', function($scope,$window,$http) {
		$scope.message = 'in banners controller';
	
    });


    adminApp.controller('usersController', function($scope,$window,$http) {
		$scope.message = 'in users controller';
	
    });
    
    
