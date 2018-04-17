	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute','toaster']);

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
		

		$scope.server = "http://sea2meat.com:8080/"
		//$scope.server = "http://localhost:8080/"
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';

		if(localStorage.getItem("userDetails")){
			$scope.user = true
			$scope.userName = JSON.parse(localStorage.getItem("userDetails"))

		}else{
			$scope.user = false
		}
		

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
		$scope.getspecial_product("TODAY_SPECIAL")
		$scope.testemonial = []
		$scope.getTestemonial = function(){
			$http.get($scope.server + 'app/gettestemonials').success(function(response, status, headers) {
				console.log("product",response)
				$scope.testemonial = response.data	
				setTimeout(function(){ 
					$('#slideshow1').owlCarousel({
						items: 1,
						autoPlay: 3000,
						singleItem: true,
						navigation: true,
						navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
						pagination: false
					  });
				 }, 1000);			
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

	scotchApp.controller('orderHistoryController', function($scope,$window,$http,toaster) {
		$scope.myorder = []
		$scope.selectedOrder = []
		$scope.canceled  = false
		$scope.statuses = ["Shipping","Shipped","Delivered"]
		$scope.selectedOrderfun = function(order){
			
			$scope.selectedOrder = order.products
			if(order.orderStatus!="Cancelled"){
				$scope.canceled  = false
			if(order.orderStatus=="Shipping"){
				console.log("order.products",order.orderStatus)

				$("#s0").addClass("progtrckr-done");
				$("#s1").addClass("progtrckr-todo");
				$("#s2").addClass("progtrckr-todo");
			}
			if(order.orderStatus=="Shipped"){
				$("#s0").addClass("progtrckr-done");
				$("#s1").addClass("progtrckr-done");
				$("#s2").addClass("progtrckr-todo");
			}
			if(order.orderStatus=="Delivered"){
				$("#s0").addClass("progtrckr-done");
				$("#s1").addClass("progtrckr-done");
				$("#s2").addClass("progtrckr-done");
			}

			
			

			
		}else{
			$scope.canceled  = true
		}
		}
		$scope.cancelOrder = function(orderId){
			console.log("in function",orderId)
			var formData = new FormData();
			formData.append("status","Cancelled");
			formData.append("orderId",orderId);
			var config = {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}

			$http.post($scope.server + 'app/changeOrderStatus' , formData,config).success(function(response, status, headers) {
				$scope.getOrderHistory();
			}).error(function(response, status, headers) {
			
			});

		}
		$scope.getOrderHistory = function(){
			var user = JSON.parse(localStorage.getItem("userDetails"))
			if(user){
				$http.get($scope.server + 'app/getmyorder/'+user.id).success(function(response, status, headers) {
					console.log("product",response)
					if(response.code == 200 || response.code == "200"){
						$scope.myorder = response.Orders
					}else{
						toaster.pop({
							type: 'error',
							title: 'No orders',
							body: "No orders yet!",
							timeout: 3000
						});
						
					}
					

				}).error(function(response, status, headers) {
				
				});

			}
			
		}

		$scope.getOrderHistory()


		
	});

	scotchApp.controller('confirmorderController', function($scope,$window,$http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('registerController', function($scope,$window,$http,toaster) {
		console.log("I am in register controller")
		$scope.is_logged_in  = localStorage.getItem("is_logged_in")
		$scope.registerData = {"firstName":"","lastName":"","mobile":"","fax":"","email":"","company":"","is_admin":0,"subscription":false,"street":"","pincode":"","city":"","country":"","password":"","confirmpassword":"","state":"","subcriptionYes":"","subcriptionNo":""}
		$scope.registerUser = function(){
			var headers = {
				'Content-Type': "application/json"
			  }
			$http.post($scope.server + 'app/register', $scope.registerData,headers).success(function(response, status, headers) {
				if(response.code == 200){
					localStorage.setItem("userDetails",JSON.stringify(response.user))
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = true
					toaster.pop({
						type: 'success',
						title: 'Hello! Welcome',
						body: "Registered Successfully!",
						timeout: 3000
					});
					$window.location.href = '#/my_account';
                    $window.location.reload()
					
				}else{
					
					toaster.pop({
						type: 'success',
						title: 'Hello! Register',
						body: "Invalid User Credentials!",
						timeout: 3000
					});

				}
				
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('loginController', function($scope,$window,$http,toaster,$window) {
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
			$window.location.href = '#/my_account';
			
		}else{
			$window.location.href = '#/login';
			
		}
		console.log("I am in login controller")
		$scope.data = {"email":"","password":""}
		$scope.server = "http://sea2meat.com:8080/";
		//$scope.server = "http://localhost:8080/"

		$scope.is_logged_in  = localStorage.getItem("is_logged_in")

		$scope.login = function(){

			$http.post($scope.server + 'app/login', $scope.data).success(function(response, status, headers) {
				if(response.code == 200){
					localStorage.setItem("userDetails",JSON.stringify(response.user)) 
					localStorage.setItem("is_logged_in",true)
					$scope.is_logged_in = true
					console.log( 'Logged in Successfully!');
					toaster.pop({
						type: 'success',
						title: 'Logged in Successfully!',
						body: "Logged In",
						timeout: 3000
					});
					$window.location.href = '#/my_account';
				}else{
					//localStorage.setItem("is_logged_in",false)
					//$scope.is_logged_in = false
					//alert('Hello! Register', 'Invalid User Credentials!');
					toaster.pop({
						type: 'success',
						title: 'Hello! Register',
						body: "Invalid User Credentials!",
						timeout: 3000
					});

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

			//------------- Adding into Cart ------------------- //
			$scope.showAddItem = function(item){
				console.log("item",item)
				location.href = "#/add/"+item.id
			}
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

			//------------- Adding into Cart ------------------- //
			$scope.showAddItem = function(item){
				console.log("item",item)
				location.href = "#/add/"+item.id
			}
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

			//------------- Adding into Cart ------------------- //
			$scope.showAddItem = function(item){
				console.log("item",item)
				location.href = "#/add/"+item.id
			}
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

			//------------- Adding into Cart ------------------- //
			$scope.showAddItem = function(item){
				console.log("item",item)
				location.href = "#/add/"+item.id
			}
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

			//------------- Adding into Cart ------------------- //
			$scope.showAddItem = function(item){
				console.log("item",item)
				location.href = "#/add/"+item.id
			}
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
		
			//------------- Adding into Cart ------------------- //
			$scope.showAddItem = function(item){
				console.log("item",item)
				location.href = "#/add/"+item.id
			}

	});

	scotchApp.controller('AddWishListController', function($scope,$window,$http,toaster) {

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
		
		// $scope.addWish = function(type){
		// 	if($scope.wish_list.length==0)	{
		// 		$scope.adding(type)
		// 	}
		// 	angular.forEach($scope.wish_list, function(item){
		// 		// var obj = {};
		// 		// var valObj = {};

		// 		// valObj.id = item.id;
				
		// 		console.log("item.id==type",item.id,type,item)
		// 		if(item.id==type)return false;
		// 		$scope.adding(type)
		// 	});
				
			
		// }

		$scope.addWish = function(type){
			var user = JSON.parse(localStorage.getItem("userDetails"))
			if(user){
				$http.post($scope.server + 'app/addwish?user_id='+user.id+'&prod_id='+type).success(function(response) {
					$scope.getwishList()
					toaster.pop({
						type: 'success',
						title: 'Added to your wishList',
						body: "Wish List",
						timeout: 3000
					});

					$window.location.href = '#/wish_list';	

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


	

	scotchApp.controller('addPeoductController', function($scope,$window,$http,$routeParams,toaster) {
		$scope.cart = {"quantity":1};
		$('.thumbnails').magnificPopup({
    		type:'image',
    		delegate: 'a',
    		gallery: {
    			enabled:true
    		}
    	});
		$http.get($scope.server + 'app/productDetails/'+$routeParams.productId).success(function(response, status, headers) {
			
			$scope.product = response.data[0]
			$scope.selectedImage = $scope.product.product_image[0].imagelink

		}).error(function(response, status, headers) {
		
		});
		var user = JSON.parse(localStorage.getItem("userDetails"))
		if(user){
		}else{
			$window.location.href = '#/login';
			
		}		
		
		var cartDetails = null
		if(localStorage.getItem('cartDetails') !="" || localStorage.getItem('cartDetails')){
			 cartDetails = JSON.parse(localStorage.getItem('cartDetails'))

		}
		if(cartDetails){
			$scope.cartDetails = cartDetails
		}else{
			$scope.cartDetails = {"userId":user.id,"orderValue":0.0,"offerId":"","":"","orderStatus":"Placed","delivaryDate":"","cart":[]}

		}
		$scope.addtocart =  function(item){
			var productDetails = {}
			var price = item.price
			if(item.is_sale && item.sale_price){
				price = item.sale_price

			}
			$scope.cartDetails.orderValue = $scope.cartDetails.orderValue + ($scope.cart.quantity * price)
			productDetails["productId"] = item.id
			productDetails["quantity"] = $scope.cart.quantity
			productDetails["itemdetails"] = item
			var index = $scope.cartDetails.cart.findIndex(eachele => eachele.productId == item.id)
			if (index > -1){
				console.log($scope.cartDetails.cart[index])
				$scope.cartDetails.cart[index]['quantity'] = $scope.cartDetails.cart[index]['quantity'] + $scope.cart.quantity
			} else{
				$scope.cartDetails.cart.push(productDetails)

			}
			localStorage.setItem("cartDetails",JSON.stringify($scope.cartDetails))
			toaster.pop({
				type: 'success',
				title: 'Item is added to cart',
				body: "Please check cart to checkout",
				timeout: 3000
			});
			$window.location.reload()
		}

		$scope.continueShopping = function(){
			$window.location.href = '#/';

		}

		$scope.selectedImagefun = function(image){
			$scope.selectedImage = image.imagelink

		}


		


	});

	


	
	scotchApp.controller('edit_accountController', function($scope,$window,$http,toaster) {
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
		$scope.company = user.company
		$scope.subscription = user.subscription
		$scope.is_admin = user.is_admin
		$scope.editAccount = function(){
			$http.post($scope.server + 'app/editaccount?email='+$scope.email+'&mobile='+$scope.mobile+'&firstname='+$scope.firstname+'&lastname='+$scope.lastname+'&fax='+$scope.fax+'&id='+$scope.id).success(function(response, status, headers) {
				console.log("product",response)
				localStorage.setItem("userDetails",JSON.stringify(response.user))
				toaster.pop({
					type: 'success',
					title: 'Updated Account',
					body: "Account",
					timeout: 3000
				});
			}).error(function(response, status, headers) {
			
			});
		}

	});	
	scotchApp.controller('change_passwordController', function($scope,$window,$http,toaster) {
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
				toaster.pop({
					type: 'success',
					title: 'Updated Password',
					body: "Password",
					timeout: 3000
				});
			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('address_bookController', function($scope,$window,$http,toaster) {
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
					toaster.pop({
						type: 'success',
						title: 'Edited Address',
						body: "Address",
						timeout: 3000
					});
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
					toaster.pop({
						type: 'success',
						title: 'Added Address',
						body: "Address",
						timeout: 3000
					});
				}).error(function(response, status, headers) {
				
				});
		}

		$scope.deleteAddress = function(address){
			
				$http.delete($scope.server + 'app/addaddress?id='+address.id).success(function(response, status, headers) {
					console.log("address",response)
					$scope.getAddress()	
					$scope.data = {}
					$scope.add = false
					toaster.pop({
						type: 'success',
						title: 'Deleted Address',
						body: "Address",
						timeout: 3000
					});
				}).error(function(response, status, headers) {
				
				});
		}

		$scope.getAddress = function(){
			if(user){
				$scope.user_id = user.id
			$http.get($scope.server + 'app/getaddress?id='+$scope.user_id).success(function(response, status, headers) {
				console.log("address",response)
				$scope.my_address = response
			}).error(function(response, status, headers) {
			
			});

			}
			
		}
		$scope.getAddress()	
	});
	
	scotchApp.controller('newsletterController', function($scope,$window,$http,toaster) {
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
				localStorage.setItem("userDetails",JSON.stringify(response.user))
				toaster.pop({
					type: 'success',
					title: 'Updated Subscription',
					body: "Subscription",
					timeout: 3000
				});

			}).error(function(response, status, headers) {
			
			});
		}
	});

	scotchApp.controller('checkoutController', function($scope,$window,$http,toaster) {
	  $scope.user = JSON.parse(localStorage.getItem("userDetails"))
	  $scope.taxDeatils = {"Shipping":5.00,"Vat":4.00,"eco_tax":2.00}
	  $scope.voucherCheck = false
	  
		if($scope.user){
		}else{
			$window.location.href = '#/login';
			
		}
		var cartDetails = {}
	   if(localStorage.getItem("cartDetails") && localStorage.getItem("cartDetails") != ""){
		cartDetails = JSON.parse(localStorage.getItem("cartDetails"))

	   }
	   $scope.cartDetails = cartDetails
	   $scope.discount = 0
	   $scope.total = cartDetails.orderValue - $scope.discount + $scope.taxDeatils.Shipping + $scope.taxDeatils.eco_tax + $scope.taxDeatils.Vat
	   $scope.applyVoucher = function(value){
			console.log(value,$scope.cartDetails)
			if($scope.user){
			$scope.user_id = $scope.user.id
			$http.post($scope.server + 'app/reedemvoucher?code='+value+'&cartvalue='+$scope.cartDetails.orderValue+'&userid='+$scope.user_id).success(function(response, status, headers) {
				$scope.voucher_response = response
				$scope.cartDetails.offerId = response.offer_id
				$scope.coupoun_message = $scope.voucher_response.message
				if($scope.voucher_response.code==201){
					// $('#c_message').removeClass("active")
					$scope.discount = 0
					$scope.total = cartDetails.orderValue - $scope.discount + $scope.taxDeatils.Shipping + $scope.taxDeatils.eco_tax + $scope.taxDeatils.Vat
					$('#c_message').addClass("alert alert-danger")
				}else{
					$scope.type = $scope.voucher_response.type
					if($scope.type == "FLAT"){
						$scope.discount = $scope.voucher_response.value
						$scope.total = cartDetails.orderValue - $scope.discount + $scope.taxDeatils.Shipping + $scope.taxDeatils.eco_tax + $scope.taxDeatils.Vat
					}
					else{
						$scope.discount = ($scope.voucher_response.value/100)*$scope.cartDetails.orderValue
						$scope.total = cartDetails.orderValue - $scope.discount + $scope.taxDeatils.Shipping + $scope.taxDeatils.eco_tax + $scope.taxDeatils.Vat
					}
					if($scope.total<0){
						$scope.total = 0
					}
					$('#c_message').removeClass("alert alert-danger")
					$('#c_message').addClass("alert alert-success")
				}
				console.log("voucher",$scope.voucher_response)
			}).error(function(response, status, headers) {
			
			});

			}

		}

	   $scope.getCartValue = function(){

	   }
		
		$scope.getAddress = function(){
			if($scope.user){
				$scope.user_id = $scope.user.id
			$http.get($scope.server + 'app/getaddress?id='+$scope.user_id).success(function(response, status, headers) {
				$scope.my_address = response
			}).error(function(response, status, headers) {
			
			});

			}
			
		}
		$scope.getAddress()	

		$scope.confirmorder = function(){

			if($scope.cartDetails.addressId && $scope.cartDetails.termsandCondition && $scope.cartDetails.userId){

				$http.post($scope.server + "app/order",JSON.stringify($scope.cartDetails)).success(function(response, status, headers) {
					localStorage.removeItem('cartDetails') 
					$window.location.reload()
					$window.location.href = "#/confirmorder"

	
				}).error(function(response, status, headers) {
				
				});
			}else{
				if(!$scope.cartDetails.addressId){
					//alert("Please Select address")
					toaster.pop({
						type: 'error',
						title: 'Please Select address',
						body: "Address",
						timeout: 3000
					});
				}else if(!$scope.cartDetails.termsandCondition){
					toaster.pop({
						type: 'error',
						title: 'Please Check Tearms and Condition',
						body: "Terms And Condition",
						timeout: 3000
					});
				}
				else if(!$scope.cartDetails.userId){
					toaster.pop({
						type: 'error',
						title: 'Please Login to checkout the order',
						body: "Login",
						timeout: 3000
					});
					alert("")


				}else{
					toaster.pop({
						type: 'error',
						title: 'Please Contact admin',
						body: "Admin",
						timeout: 3000
					});
				}
				
			}

			
		}


	});

	