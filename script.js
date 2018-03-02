	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute','toastr']);

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
			.when('/order_history', {
				templateUrl : 'pages/order_history.html',
				controller  : 'orderHistoryController'
			})
			//------------ My account page -------- //
			.when('/my_account', {
				templateUrl : 'pages/my_account.html',
				controller  : 'myaccountController'
			})

			//------------ My account page -------- //
			.when('/edit_account', {
				templateUrl : 'pages/edit_account.html',
				controller  : 'editaccountController'
			})

			//------------ My account page -------- //
			.when('/change_password', {
				templateUrl : 'pages/change_password.html',
				controller  : 'changepasswordController'
			})
			//------------ My address book page -------- //
			.when('/address_book', {
				templateUrl : 'pages/address_book.html',
				controller  : 'changepasswordController'
			})
			//------------ My wish list page -------- //
			.when('/wish_list', {
				templateUrl : 'pages/wish_list.html',
				controller  : 'changepasswordController'
			})
			//------------ My downloads page -------- //
			.when('/downloads', {
				templateUrl : 'pages/downloads.html',
				controller  : 'changepasswordController'
			})
			//------------ My Recurring page -------- //
			.when('/recurring_payments', {
				templateUrl : 'pages/recurring_payments.html',
				controller  : 'changepasswordController'
			})

			//------------ My reward_points page -------- //
			.when('/reward_points', {
				templateUrl : 'pages/reward_points.html',
				controller  : 'changepasswordController'
			})
			//------------ My returns page -------- //
			.when('/returns', {
				templateUrl : 'pages/returns.html',
				controller  : 'changepasswordController'
			})
			//------------ My transactions page -------- //
			.when('/transactions', {
				templateUrl : 'pages/transactions.html',
				controller  : 'changepasswordController'
			})
			//------------ My newsletter page -------- //
			.when('/newsletter', {
				templateUrl : 'pages/newsletter.html',
				controller  : 'changepasswordController'
			})
			//------------ My logout page -------- //
			.when('/logout', {
				templateUrl : 'pages/logout.html',
				controller  : 'changepasswordController'
			})
			// ----------- when register ---------- //
			.when('/register', {
				templateUrl : 'pages/register.html',
				controller  : 'registerController'
			});

			
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,$http) {
		

	
		  
		


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

		$scope.images = []
		$scope.getBanner = function(){
			$http.get($scope.server + 'app/getbanner').success(function(response, status, headers) {
				console.log("product",response)
				$scope.images = response
				setTimeout(function(){ 
					$('#slideshow0').owlCarousel({
						items: 6,
						autoPlay: 3000,
						singleItem: true,
						navigation: true,
						navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
						pagination: false
					  });
				 }, 1000);

				//----------- Main Slider Setttings -------------- //
		
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getBanner()

		$scope.about = []
		$scope.getAbout = function(){
			$http.get($scope.server + 'app/getabout').success(function(response, status, headers) {
				console.log("product",response)
				$scope.about = response
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getAbout()
		$scope.getfeatured_product = function(type){
			$scope.featured_product = []
			if(type=="BEEF"){
				$('#tab_beef').addClass("tab active")
				$('#tab_lamb').removeClass("active")
				$('#tab_poultry').removeClass("active")
				$('#tab_sausage').removeClass("active")
				$('#tab_today').removeClass("active")
			}
			if(type=="LAMB"){
				$('#tab_beef').removeClass("active")
				$('#tab_lamb').addClass("tab active")
				$('#tab_poultry').removeClass("active")
				$('#tab_sausage').removeClass("active")
				$('#tab_today').removeClass("active")
			}
			if(type=="POULTRY"){
				$('#tab_beef').removeClass("active")
				$('#tab_lamb').removeClass("active")
				$('#tab_poultry').addClass("tab active")
				$('#tab_sausage').removeClass("active")
				$('#tab_today').removeClass("active")
			}
			if(type=="SAUSAGE"){
				$('#tab_beef').removeClass("active")
				$('#tab_lamb').removeClass("active")
				$('#tab_poultry').removeClass("active")
				$('#tab_sausage').addClass("tab active")
				$('#tab_today').removeClass("active")

			}
			if(type=="today_special"){
				$('#tab_beef').removeClass("active")
				$('#tab_lamb').removeClass("active")
				$('#tab_poultry').removeClass("active")
				$('#tab_sausage').removeClass("active")
				$('#tab_today').addClass("tab active")
				
			}
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.featured_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getfeatured_product("BEEF")

		$scope.getspecial_product = function(type){
			$scope.special_product = []
			
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.special_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getspecial_product("BEEF")
		$scope.testemonial = []
		$scope.getTestemonial = function(){
			$http.get($scope.server + 'app/gettestemonials').success(function(response, status, headers) {
				console.log("product",response)
				$scope.testemonial = response.data	
				setTimeout(function(){ 
					$('#slideshow1').owlCarousel({
						items: 6,
						autoPlay: 3000,
						singleItem: true,
						navigation: true,
						navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
						pagination: false
					  });
				 }, 3000);			
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getTestemonial()
		

		$scope.brandImages = []
		$scope.getAbout = function(){
			$http.get($scope.server + 'app/getbrand').success(function(response, status, headers) {
				console.log("product",response)
				$scope.brandImages = response
				setTimeout(function(){ 
						//------------- Brnad Slider Settings -------------- //
						$('#brand-logo').owlCarousel({
							items: 5,
							autoPlay: 3000,
							navigation: true,
							navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
							pagination: false
						});

				},1000)
		
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getAbout()

	});
// Main Controller Ends here

	scotchApp.controller('orderHistoryController', function($scope,$http) {
		$scope.getOrderHistory = function(){
			$http.get($scope.server + '/app/order_history').success(function(response, status, headers) {
				console.log("product",response)
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getOrderHistory()


		
	});

	scotchApp.controller('contactController', function($scope,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('registerController', function($scope,$http) {
		console.log("I am in register controller")
		$scope.is_logged_in  = localStorage.getItem("is_logged_in")
		$scope.registerData = {"firstName":"","lastName":"","mobile":"","fax":"","email":"","company":"","subscription":"","street":"","pincode":"","city":"","country":"","password":"","confirmpassword":"","state":"","subcriptionYes":"","subcriptionNo":""}
		$scope.registerUser = function(){
			$http.post($scope.server + 'app/register', $scope.registerData).success(function(response, status, headers) {
				if(response.code == 200){
					localStorage.setItem("userDetails",response.user) 
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = true
					alert('Hello! Welcome', 'Registered Successfully!');


				}else{
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = false
					alert('Hello! Register', 'Invalid User Credentials!');

				}
				
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('loginController', function($scope,$http,toastr) {
		console.log("I am in login controller")
		$scope.data = {"email":"","password":""}
		$scope.server = "http://localhost:8082/";
		$scope.is_logged_in  = localStorage.getItem("is_logged_in")

		$scope.login = function(){

			$http.post($scope.server + 'app/login', $scope.data).success(function(response, status, headers) {
				console.log("after api call",response)
				if(response.code == 200){
					localStorage.setItem("userDetails",response.user) 
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = true
					alert('Hello! Welcome', 'Logged in Successfully!');

				}else{
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = false
					alert('Hello! Register', 'Invalid User Credentials!');

				}
				

			}).error(function(response, status, headers) {
			
			});

		}

	
	});

	scotchApp.controller('myaccountController', function($scope,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('editaccountController', function($scope,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('changepasswordController', function($scope,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});


	