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
			.when('/add/:productId', {
				templateUrl : 'pages/add_item.html',
				controller  : 'addPeoductController'
			})

			
			.when('/lamb', {
				templateUrl : 'pages/lamb.html',
				controller  : 'lambController'
			})
			.when('/todays_special', {
				templateUrl : 'pages/todays_special.html',
				controller  : 'todayspecialController'
			})
			.when('/poultry', {
				templateUrl : 'pages/poultry.html',
				controller  : 'poultryController'
			})
			.when('/sausage', {
				templateUrl : 'pages/sausage.html',
				controller  : 'sausageController'
			})
			.when('/beef', {
				templateUrl : 'pages/beef.html',
				controller  : 'beefController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

			//Checkout page

			.when('/checkout', {
				templateUrl : 'pages/checkout.html',
				controller  : 'checkoutController'
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
				templateUrl : 'pages/wishlist.html',
				controller  : 'getwishListController'
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
			})
			.when('/change_password', {
				templateUrl : 'pages/change_password.html',
				controller  : 'change_passwordController'
			})
			.when('/address_book', {
				templateUrl : 'pages/address_book.html',
				controller  : 'address_bookController'
			})
			.when('/newsletter', {
				templateUrl : 'pages/newsletter.html',
				controller  : 'newsletterController'
			})
			.when('/confirmorder', {
				templateUrl : 'pages/confirmed_order.html',
				controller  : 'confirmorderController'
			})
			.when('/edit_account', {
				templateUrl : 'pages/edit_account.html',
				controller  : 'edit_accountController'
			});

			
	});
	var wLength = 0;
	var FinalCart = [];
	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,$window,$http) {
		

	
		 // var user = JSON.parse(localStorage.getItem("userDetails"))
			// $http.get($scope.server + 'app/getwish?id='+user.id).success(function(response) {
			// 	if(wLength == 0){
			// 	$scope.wish_list_length = response.length
			// 	}else{
			// 		$scope.wish_list_length = wLength
			// 	}
			// 	console.log("wl",$scope.wish_list_length)
			// }).error(function(response) {
			
			// });
		

		$scope.server = "http://localhost:8081/"
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';

		//------------- Adding into Cart ------------------- //
		$scope.showAddItem = function(item){
			console.log("item",item)
			location.href = "#/add/"+item.id
			





		}

		

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
			if(type=="TODAY_SPECIAL"){
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

	scotchApp.controller('orderHistoryController', function($scope,$window,$http) {
		$scope.getOrderHistory = function(){
			$http.get($scope.server + '/app/order_history').success(function(response, status, headers) {
				console.log("product",response)
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getOrderHistory()


		
	});

	scotchApp.controller('contactController', function($scope,$window,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('registerController', function($scope,$window,$http) {
		console.log("I am in register controller")
		$scope.is_logged_in  = localStorage.getItem("is_logged_in")
		$scope.registerData = {"firstName":"","lastName":"","mobile":"","fax":"","email":"","company":"","subscription":false,"street":"","pincode":"","city":"","country":"","password":"","confirmpassword":"","state":"","subcriptionYes":"","subcriptionNo":""}
		$scope.registerUser = function(){
			$http.post($scope.server + 'app/register', $scope.registerData).success(function(response, status, headers) {
				if(response.code == 200){
					localStorage.setItem("userDetails",JSON.stringify(response.user))
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = true
					alert('Hello! Welcome', 'Registered Successfully!');
					
				}else{
					localStorage.setItem("is_logged_in",false)
					$scope.is_logged_in = false
					alert('Hello! Register', 'Invalid User Credentials!');

				}
				
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('loginController', function($scope,$window,$http,toastr,$window) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
			$window.location.href = '#/my_account';
			
		}else{
			$window.location.href = '#/login';
			
		}
		console.log("I am in login controller")
		$scope.data = {"email":"","password":""}
		$scope.server = "http://localhost:8080/";
		$scope.is_logged_in  = localStorage.getItem("is_logged_in")

		$scope.login = function(){

			$http.post($scope.server + 'app/login', $scope.data).success(function(response, status, headers) {
				if(response.code == 200){
					localStorage.setItem("userDetails",JSON.stringify(response.user)) 
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = true
					console.log( 'Logged in Successfully!');
					$window.location.href = '#/my_account';
				}else{
					localStorage.setItem("is_logged_in",false)
					$scope.is_logged_in = false
					alert('Hello! Register', 'Invalid User Credentials!');

				}
				

			}).error(function(response, status, headers) {
			
			});

		}

	
	});

	scotchApp.controller('myaccountController', function($scope,$window,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	
	});

	scotchApp.controller('editaccountController', function($scope,$window,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('changepasswordController', function($scope,$window,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});
//********************************* other pages***************************************
	scotchApp.controller('beefController', function($scope,$window,$http) {
		$scope.getspecial_product = function(type){
			$scope.beef_product = []
			
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.beef_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getspecial_product("BEEF")
	});
	scotchApp.controller('lambController', function($scope,$window,$http) {
		$scope.getspecial_product = function(type){
			$scope.lamb_product = []
			
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.lamb_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getspecial_product("LAMB")
	});
	scotchApp.controller('todayspecialController', function($scope,$window,$http) {
		$scope.getspecial_product = function(type){
			$scope.today_product = []
			
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.today_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getspecial_product("TODAY_SPECIAL")
	});
	scotchApp.controller('poultryController', function($scope,$window,$http) {
		$scope.getspecial_product = function(type){
			$scope.poultry_product = []
			
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.poultry_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getspecial_product("POULTRY")
	});
	scotchApp.controller('sausageController', function($scope,$window,$http) {
		$scope.getspecial_product = function(type){
			$scope.sausage_product = []
			
			$http.get($scope.server + 'app/getfeaturedproducts?name='+type).success(function(response) {
				console.log("product",response.data)
				$scope.sausage_product = response.data
			}).error(function(response) {
			
			});
		}
		$scope.getspecial_product("SAUSAGE")
	});
var wish =[]
	scotchApp.controller('getwishListController', function($scope,$window,$http) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
			if(user){

			}else{
				$window.location.href = '#/login';
				
			}	
		$scope.getwishList = function(){
			$scope.wish_list = []
			
			console.log("its user",user)
			$http.get($scope.server + 'app/getwish?id='+user.id).success(function(response) {
				console.log("wish_list",response)
				$scope.wish_list = response
				wish = $scope.wish_list
			}).error(function(response) {
			
			});
		}
		$scope.getwishList()		

	});

	scotchApp.controller('AddWishListController', function($scope,$window,$http) {

		$scope.getwishList = function(){
			$http.get($scope.server + 'app/getwish?id='+user.id).success(function(response) {
				console.log(response.length)
				$scope.wish_list = response
				
			}).error(function(response) {
			
			});
		}



		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
			$scope.getwishList()
		}else{
			
			
		}
		
		$scope.addWish = function(type){
			if($scope.wish_list.length==0)	{
				$scope.adding(type)
			}
			angular.forEach($scope.wish_list, function(item){
				// var obj = {};
				// var valObj = {};

				// valObj.id = item.id;
				
				console.log("item.id==type",item.id,type,item)
				if(item.id==type)return false;
				$scope.adding(type)
			});
				
			
		}

		$scope.adding = function(type){
			var user = JSON.parse(localStorage.getItem("userDetails"))
			if(user){
				$http.post($scope.server + 'app/addwish?user_id='+user.id+'&prod_id='+type).success(function(response) {
					$scope.getwishList()
				}).error(function(response) {
				
				});
				
			}else{
				alert("Please Login To Add To WishList")
				$window.location.href = '#/login';				
			}
		}

		// $scope.getwishList = function(){
			
			
		// }
		// $scope.getwishList()
	
});


	

	scotchApp.controller('addPeoductController', function($scope,$window,$http,$routeParams) {
		$scope.quantity = 1;
		$('.thumbnails').magnificPopup({
    		type:'image',
    		delegate: 'a',
    		gallery: {
    			enabled:true
    		}
    	});
		$http.get($scope.server + 'app/productDetails/'+$routeParams.productId).success(function(response, status, headers) {
			
			$scope.product = response.data[0]
		}).error(function(response, status, headers) {
		
		});
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
		}else{
			$window.location.href = '#/login';
			
		}		
		
		var cartDetails = JSON.parse(localStorage.getItem('cartDetails'))
		if(cartDetails){
			$scope.cartDetails = cartDetails
		}else{
			$scope.cartDetails = {"userId":user.id,"orderValue":0.0,"offerId":"","":"","orderStatus":"Placed","delivaryDate":"","cart":[]}

		}
		$scope.addtocart =  function(item){
			var productDetails = {}
			$scope.cartDetails.orderValue = $scope.cartDetails.orderValue + ($scope.quantity * item.price)
			productDetails["productId"] = item.id
			productDetails["quantity"] = $scope.quantity
			$scope.cartDetails.cart.push(productDetails)
            localStorage.setItem("cartDetails",JSON.stringify($scope.cartDetails))
		}


		


	});

	


	
	scotchApp.controller('edit_accountController', function($scope,$window,$http) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
		}else{
			$window.location.href = '#/login';
			
		}		$scope.id = user.id
		$scope.firstname = user.firstName
		$scope.lastname = user.lastName
		$scope.email = user.email
		$scope.mobile = user.mobile
		$scope.fax = user.fax
		$scope.editAccount = function(){
			$http.post($scope.server + 'app/editaccount?email='+$scope.email+'&mobile='+$scope.mobile+'&firstname='+$scope.firstname+'&lastname='+$scope.lastname+'&fax='+$scope.fax+'&id='+$scope.id).success(function(response, status, headers) {
				console.log("product",response)
				localStorage.setItem("userDetails",JSON.stringify(response.user))
			}).error(function(response, status, headers) {
			
			});
		}

	});	
	scotchApp.controller('change_passwordController', function($scope,$window,$http) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
		}else{
			$window.location.href = '#/login';
			
		}		$scope.id = user.id
		$scope.password = user.password
		$scope.password_c = ""
		$scope.p_match = false
		$scope.showPassword = false;
    $scope.toggleShowPassword = function() {
        $scope.showPassword = !$scope.showPassword;
    }
		$scope.passChange= function(){
				if($scope.password != $scope.password_c){
				$scope.p_match = true
				
			}else{
				$scope.p_match = false
			}
		}
		$scope.editpassword = function(){
			
			$http.post($scope.server + 'app/editpassword?id='+$scope.id+'&password='+$scope.password).success(function(response, status, headers) {
				console.log("product",response)
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('address_bookController', function($scope,$window,$http) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
		$scope.edit = false
		$scope.addAddress = false
		$scope.my_id = ""
		$scope.data = {}
	    
		
		if(user){
			
		}else{
			$window.location.href = '#/login';
			
		}
		$scope.editAddress = function(address){
			if($scope.edit == false){
				$scope.edit = true
			}
			
			$scope.data.a_id = address.id
			$scope.data.u_id = user.id
			$scope.data.streetAddress = address.streetAddress
			$scope.data.city =  address.city
			$scope.data.state =  address.state
			$scope.data.country =  address.country
			$scope.data.pincode =  address.pincode
			$scope.data.addressType = address.addressType
					
			
			

		}

		$scope.editAddress1 = function(){
			console.log($scope.data)
				data = $scope.data
				console.log(data)
				$http.post($scope.server + 'app/editaddress',data).success(function(response, status, headers) {
					console.log("address",response)
					$scope.getAddress()	
					$scope.data = {}
					$scope.edit = false
				}).error(function(response, status, headers) {
				
				});
		}
		$scope.addAddress1 = function(){
			$scope.add = true
		}
		$scope.addAddress = function(){
			console.log($scope.data)
			$scope.data.u_id = user.id
				data = $scope.data
				console.log(data)
				$http.post($scope.server + 'app/addaddress',data).success(function(response, status, headers) {
					console.log("address",response)
					$scope.getAddress()	
					$scope.data = {}
					$scope.add = false
				}).error(function(response, status, headers) {
				
				});
		}

		$scope.deleteAddress = function(address){
			
				console.log(address)
				$http.delete($scope.server + 'app/addaddress?id='+address.id).success(function(response, status, headers) {
					console.log("address",response)
					$scope.getAddress()	
					$scope.data = {}
					$scope.add = false
				}).error(function(response, status, headers) {
				
				});
		}

		$scope.getAddress = function(){
			$scope.user_id = user.id
			$http.get($scope.server + 'app/getaddress?id='+$scope.user_id).success(function(response, status, headers) {
				console.log("address",response)
				$scope.my_address = response
			}).error(function(response, status, headers) {
			
			});
		}
		$scope.getAddress()	
	});
	
	scotchApp.controller('newsletterController', function($scope,$window,$http) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
		}else{
			$window.location.href = '#/login';
			
		}			$scope.id = user.id
			$scope.subs = user.subscription
			radiobtn = document.getElementById("n_yes");
			radiobtn.checked = $scope.subs;
			// radiobtn = document.getElementById("n_yes");
			// radiobtn.checked = $scope.subs;
		$scope.setSubscription = function(){
			$http.post($scope.server + 'app/updatenewsletter?id='+$scope.id+'&subscription='+$scope.subs).success(function(response, status, headers) {
				console.log("Subscription",response)
				localStorage.setItem("userDetails",JSON.stringify(response.user))
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('checkoutController', function($scope,$window,$http) {
	  $scope.user = JSON.parse(localStorage.getItem("userDetails"))
		
		if($scope.user){
		}else{
			$window.location.href = '#/login';
			
		}

	   var cartDetails = JSON.parse(localStorage.getItem("cartDetails"))
	   console.log(cartDetails,":::cartDetails")
		
		$scope.getAddress = function(){
			$scope.user_id = $scope.user.id
			$http.get($scope.server + 'app/getaddress?id='+$scope.user_id).success(function(response, status, headers) {
				console.log("address",response)
				$scope.my_address = response
			}).error(function(response, status, headers) {
			
			});
		}
		$scope.getAddress()	

		$scope.confirmorder = function(){
			var cartDetails = JSON.parse(localStorage.getItem("cartDetails"))

			$http.post($scope.server + "app/order",JSON.stringify(cartDetails)).success(function(response, status, headers) {
				$window.location.href = "#/confirmorder"

			}).error(function(response, status, headers) {
			
			});
		}


	});

	