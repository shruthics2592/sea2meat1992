agGrid.initialiseAgGridWithAngular1(angular);

	// create the module and name it scotchApp
	var adminApp = angular.module('adminApp', ['ngRoute','agGrid']);

	// configure our routes
	adminApp.config(function($routeProvider) {
		$routeProvider
			
			// route for the home page
				// 		.when('/', {
				// templateUrl : 'pages/home.html',
				// controller  : 'homeController'
				// 		})
						.when('/login', {
				templateUrl : 'login.html',
				controller  : 'loginController'
						})
            
            .when('/product', {
				templateUrl : 'pages/product.html',
				controller  : 'productController'
            })
            
            .when('/', {
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
				templateUrl : 'pages/orders.html',
				controller  : 'ordersController'
            })
            .when('/banners', {
				templateUrl : 'pages/banners.html',
				controller  : 'bannersController'
			})
			.when('/update_webContent', {
				templateUrl : 'pages/update_webContent.html',
				controller  : 'update_webContent'
			});

			
    });
    
		var server = "http://localhost:8080/";
		adminApp.run(function($rootScope) {
			$rootScope.test = false
			
		})
    adminApp.controller('homeController', function($scope,$window,$http,$rootScope) {
			console.log("$rootScope.test home",$rootScope.test)
			var user   = JSON.parse(localStorage.getItem("adminuserDetails"))
			console.log("hi",user)
			
			$scope.logout=function(){
				localStorage.clear();
				$window.location.href = '#/login';

			}
			if(user){
				$scope.Fname = user.firstName
				$scope.Lname = user.lastName

			}else{
				$window.location.href = '#/login';
				
			}
			
			
    });


		adminApp.controller('loginController', function($scope,$window,$http,$rootScope) {
			console.log("I am in login controller")
			$scope.data = {"email":"","password":""}
			$rootScope.test = false
			var user   = JSON.parse(localStorage.getItem("adminuserDetails"))
			if(user){
				$window.location.href = '#/';
			}else{
				$window.location.href = '#/login';
				
			}
			// $scope.is_admin_in  = localStorage.getItem("is_admin_in")
			$scope.login = function(){
	
				$http.post(server + 'admin/login', $scope.data).success(function(response, status, headers) {
					if(response.code == 200){
						localStorage.setItem("adminuserDetails",JSON.stringify(response.user)) 
						localStorage.setItem("is_admin_in",true)
						console.log( 'Logged in Successfully!');
						$window.location.href = '#/';
					}else{
						localStorage.setItem("is_admin_in",false)
	
					}
					
	
				}).error(function(response, status, headers) {
				
				});
	
			}	
			
		});


    adminApp.controller('productController', function($scope,$window,$http,$rootScope) {
		$rootScope.test = true
		var user   = JSON.parse(localStorage.getItem("adminuserDetails"))
			if(user){
			}else{
				$window.location.href = '#/login';
				
			}
		$scope.gridOptions = {}
		$scope.is_add = false
		$scope.files = [];

		//listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });
	$scope.getUser = function () {
		type = "ALL"
		$http.get(server + 'app/getfeaturedproducts?name='+type).success(function(response, status, headers) {
			$scope.model = response.data
			console.log($scope.model)
			$scope.createRowData();
		}).error(function(response, status, headers) {
		
		});		
	};
	$scope.add = function(){
		if ($scope.is_add == false){
		$scope.is_add = true
		}else{
			$scope.is_add = false
		}
	}
	$scope.my_image = ""
	$scope.registerData = {"product_code":"","categoryId":"","description":"","currency":"","price":"","sale_price":"","is_active":"","is_available":"","is_sale":"","is_special":""}
	$scope.registerUser = function(){
		var formData = new FormData();
		formData.append("productname","Product Beef1")
		for (var i = 0; i < $scope.files.length; i++) {
			//add each file to the form data and iteratively name them
			formData.append("image", $scope.files[i]);
		}
		var config = {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }
		$http.post(server + 'admin/addproduct', $scope.registerData).success(function(response, status, headers) {
			$scope.is_add = false
			$scope.getUser();
			$scope.createRowData();
		}).error(function(response, status, headers) {
		
		});
	}

	$scope.getUser();
	
	var columnDefs = [
				
				
				
							{headerName: "Id",editable: false, field: "id",
										width: 150},
								{headerName: "category_name", field: "category_name",
										width: 300},
								{headerName: "description",editable: false, field: "description",
										width: 150},
								{headerName: "currency", field: "currency",
										width: 300},
								{headerName: "imagelink",editable: false, field: "imagelink",
										width: 150},
								{headerName: "is_active", field: "is_active",
										width: 300},
								{headerName: "is_available",editable: false, field: "is_available",
										width: 150},
								{headerName: "is_sale", field: "is_sale",
										width: 300},
								{headerName: "is_todaysSpecial",editable: false, field: "is_todaysSpecial",
										width: 150},
								{headerName: "name", field: "name",
										width: 300},
								{headerName: "price",editable: false, field: "price",
										width: 150},
								{headerName: "sale_price", field: "sale_price",
										width: 300},
								{headerName: "swapImage",editable: false, field: "swapImage",
										width: 150},
								{headerName: "thumbnailImage", field: "thumbnailImage",
										width: 300}
										

						
				
		];

		$scope.gridOptions = {
				columnDefs: columnDefs,
				rowData: [],
				rowSelection: 'multiple',
				enableColResize: true,
				enableSorting: true,
				enableFilter: true,
				onModelUpdated: $scope.onModelUpdated,
				defaultColDef: {
					editable: true
				},
				onCellEditingStarted: function(event) {
					console.log('cellEditingStarted',event);
			},
			onCellEditingStopped: function(event) {

					console.log('cellEditingStopped',event);
					if (event.data.subscription=="No" || event.data.subscription=="no"){
						event.data.subscription = 0
					}else{
						event.data.subscription = 1
					}
					
						$http.post(server + 'app/editaccount?email='+event.data.email+'&mobile='+event.data.mobile+'&firstname='+event.data.firstname+'&lastname='+event.data.lastname+'&fax='+event.data.fax+'&id='+event.data.id+'&company='+event.data.company+'&subscription='+event.data.subscription).success(function(response, status, headers) {
							console.log("product",response)
							localStorage.setItem("adminuserDetails",JSON.stringify(response.user))
						}).error(function(response, status, headers) {
						});
						
			},
				suppressRowClickSelection: true
		};
		
		 $scope.onModelUpdated = function() {
				var model = $scope.gridOptions.api.getModel();
				var totalRows = $scope.gridOptions.rowData.length;
				var processedRows = model.getRowCount();
				$scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
		}
	
		$scope.createRowData = function() {
				var rowData = [];
				for (var i = 0; i < $scope.model.length; i++) {
						rowData.push({
							id: $scope.model[i].id,	
							category_name: $scope.model[i].category_name,
							description: $scope.model[i].description,
							currency: $scope.model[i].currency,
							imagelink: $scope.model[i].imagelink,
							is_active: $scope.model[i].is_active,
							is_available: $scope.model[i].is_available,
							is_sale: $scope.model[i].is_sale,
							is_todaysSpecial: $scope.model[i].is_todaysSpecial,
							name: $scope.model[i].name,
							price: $scope.model[i].price,
							sale_price: $scope.model[i].sale_price,
							swapImage: $scope.model[i].swapImage,
							thumbnailImage: $scope.model[i].thumbnailImage
						 });
				}
				console.log("row",$scope.gridOptions)
				// $scope.gridOptions.rowData =rowData
				$scope.gridOptions.api.setRowData(rowData)
				// return rowData;
		}	
    });

    adminApp.controller('customerController', function($scope,$rootScope,$window,$http) {
		$rootScope.test = true
		var user   = JSON.parse(localStorage.getItem("adminuserDetails"))
		

			if(user){
				
			}else{
	
				$window.location.href = '#/login';
				
			}
		$scope.gridOptions = {}
			$scope.is_add = false
		$scope.getUser = function () {
			$http.get(server + 'admin/getuser?is_admin=0').success(function(response, status, headers) {
				$scope.model = response
				console.log($scope.model)
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});		
		};
		$scope.add = function(){
			if ($scope.is_add == false){
			$scope.is_add = true
			}else{
				$scope.is_add = false
			}
		}
		$scope.registerData = {"is_admin":"","firstName":"","lastName":"","mobile":"","fax":"","email":"","company":"","is_admin":0,"subscription":false,"street":"","pincode":"","city":"","country":"","password":"","confirmpassword":"","state":"","subcriptionYes":"","subcriptionNo":""}
		$scope.registerUser = function(){
			$http.post(server + 'app/register', $scope.registerData).success(function(response, status, headers) {
				$scope.is_add = false
				$scope.getUser();
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getUser();
		
		var columnDefs = [
					
					
					{
						headerName: 'Basic Info',
							children: [
								{headerName: "Id",editable: false, field: "id",
											width: 150, pinned: true},
									{headerName: "First Name", field: "firstname",
											width: 150, pinned: true},
											{headerName: "Last Name", field: "lastname",
											width: 150, pinned: true},
									{headerName: "Email",editable: false, field: "email", width: 150, pinned: true,
											filterParams: { cellHeight: 20}},
							]
					},
					
					{
							headerName: 'Contact',
							children: [
									{headerName: "Mobile", field: "mobile", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Fax", field: "fax", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Company", field: "company", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Created At",editable: false, field: "createdAt", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Updated At",editable: false, field: "updatedAt", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Admin",editable: false, field: "admin", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Subscription", field: "subscription", width: 150, filter: 'agTextColumnFilter'},
							]
					}
			];

			$scope.gridOptions = {
					columnDefs: columnDefs,
					rowData: [],
					rowSelection: 'multiple',
					enableColResize: true,
					enableSorting: true,
					enableFilter: true,
					onModelUpdated: $scope.onModelUpdated,
					defaultColDef: {
						editable: true
					},
					onCellEditingStarted: function(event) {
						console.log('cellEditingStarted',event);
				},
				onCellEditingStopped: function(event) {

						console.log('cellEditingStopped',event);
						if (event.data.subscription=="No" || event.data.subscription=="no"){
							event.data.subscription = 0
						}else{
							event.data.subscription = 1
						}
						
							$http.post(server + 'app/editaccount?email='+event.data.email+'&mobile='+event.data.mobile+'&firstname='+event.data.firstname+'&lastname='+event.data.lastname+'&fax='+event.data.fax+'&id='+event.data.id+'&company='+event.data.company+'&subscription='+event.data.subscription).success(function(response, status, headers) {
								console.log("product",response)
								localStorage.setItem("adminuserDetails",JSON.stringify(response.user))
							}).error(function(response, status, headers) {
							});
							
				},
					suppressRowClickSelection: true
			};
			
			 $scope.onModelUpdated = function() {
					var model = $scope.gridOptions.api.getModel();
					var totalRows = $scope.gridOptions.rowData.length;
					var processedRows = model.getRowCount();
					$scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
			}
		
			$scope.createRowData = function() {
					var rowData = [];
					for (var i = 0; i < $scope.model.length; i++) {
							rowData.push({
								id: $scope.model[i].id,	
								firstname: $scope.model[i].firstName,
								lastname: $scope.model[i].lastName,
								email: $scope.model[i].email,
								mobile: $scope.model[i].mobile,
								fax: $scope.model[i].fax,
								company: $scope.model[i].company,
								createdAt: $scope.model[i].createdAt,
								updatedAt: $scope.model[i].updatedAt,
								admin: $scope.model[i].is_admin ? "yes" : "no",
								subscription: $scope.model[i].subscription ? "yes" : "no"
							 });
					}
					console.log("row",$scope.gridOptions)
					// $scope.gridOptions.rowData =rowData
					$scope.gridOptions.api.setRowData(rowData)
					// return rowData;
			}
	
	});
	var image_toE =""
	function imageChange  (el){
		console.log("jhvjhbj",el)
		image_toE = el
	}
    adminApp.controller('brandsController', function($scope,$window,$http,$rootScope) {
		$rootScope.test = true
		
		var user   = JSON.parse(localStorage.getItem("adminuserDetails"))

			if(user){
				
			}else{
	
				$window.location.href = '#/login';
				
			}
		$scope.gridOptions = {}
			$scope.is_add = false
		$scope.getUser = function () {
			$http.get(server + 'app/getbrand').success(function(response, status, headers) {
				$scope.model = response
				console.log($scope.model)
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});		
		};
		$scope.add = function(){
			if ($scope.is_add == false){
			$scope.is_add = true
			}else{
				$scope.is_add = false
			}
		}
		$scope.my_image = ""
		
		$scope.registerUser = function(){
			
			var data = {"image":image_toE.target.value}
			console.log("hi",data)
			$http.post(server + 'admin/addbrand?image='+image_toE.target.value).success(function(response, status, headers) {
				$scope.is_add = false
				$scope.getUser();
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getUser();
		
		var columnDefs = [
					
					
					
								{headerName: "Id",editable: false, field: "id",
											width: 150},
									{headerName: "Image", field: "image",
											width: 300}
	
							
					
			];

			$scope.gridOptions = {
					columnDefs: columnDefs,
					rowData: [],
					rowSelection: 'multiple',
					enableColResize: true,
					enableSorting: true,
					enableFilter: true,
					onModelUpdated: $scope.onModelUpdated,
					defaultColDef: {
						editable: true
					},
					onCellEditingStarted: function(event) {
						console.log('cellEditingStarted',event);
				},
				onCellEditingStopped: function(event) {

						console.log('cellEditingStopped',event);
						if (event.data.subscription=="No" || event.data.subscription=="no"){
							event.data.subscription = 0
						}else{
							event.data.subscription = 1
						}
						
							$http.post(server + 'app/editaccount?email='+event.data.email+'&mobile='+event.data.mobile+'&firstname='+event.data.firstname+'&lastname='+event.data.lastname+'&fax='+event.data.fax+'&id='+event.data.id+'&company='+event.data.company+'&subscription='+event.data.subscription).success(function(response, status, headers) {
								console.log("product",response)
								localStorage.setItem("adminuserDetails",JSON.stringify(response.user))
							}).error(function(response, status, headers) {
							});
							
				},
					suppressRowClickSelection: true
			};
			
			 $scope.onModelUpdated = function() {
					var model = $scope.gridOptions.api.getModel();
					var totalRows = $scope.gridOptions.rowData.length;
					var processedRows = model.getRowCount();
					$scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
			}
		
			$scope.createRowData = function() {
					var rowData = [];
					for (var i = 0; i < $scope.model.length; i++) {
							rowData.push({
								id: $scope.model[i].id,	
								image: $scope.model[i].image
							 });
					}
					console.log("row",$scope.gridOptions)
					// $scope.gridOptions.rowData =rowData
					$scope.gridOptions.api.setRowData(rowData)
					// return rowData;
			}
    });

    adminApp.controller('bannersController', function($scope,$window,$http,$rootScope) {
		$rootScope.test = true
		var user   = JSON.parse(localStorage.getItem("adminuserDetails"))

			if(user){
				
			}else{
	
				$window.location.href = '#/login';
				
			}
		$scope.gridOptions = {}
			$scope.is_add = false
		$scope.getUser = function () {
			$http.get(server + 'app/getbanner').success(function(response, status, headers) {
				$scope.model = response
				console.log($scope.model)
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});		
		};
		$scope.add = function(){
			if ($scope.is_add == false){
			$scope.is_add = true
			}else{
				$scope.is_add = false
			}
		}
		$scope.registerData = {"image":""}
		
		$scope.registerUser = function(){
			console.log($scope.registerData)
			$http.post(server + 'admin/addbrand?image='+image_toE.target.value).success(function(response, status, headers) {
				$scope.is_add = false
				$scope.getUser();
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getUser();
		
		var columnDefs = [
					
					
					
								{headerName: "Id",editable: false, field: "id",
											width: 150},
									{headerName: "Image", field: "image",
											width: 300},
											{headerName: "Image To", field: "image_to",
											width: 300}
	
							
					
			];

			$scope.gridOptions = {
					columnDefs: columnDefs,
					rowData: [],
					rowSelection: 'multiple',
					enableColResize: true,
					enableSorting: true,
					enableFilter: true,
					onModelUpdated: $scope.onModelUpdated,
					defaultColDef: {
						editable: true
					},
					onCellEditingStarted: function(event) {
						console.log('cellEditingStarted',event);
				},
				onCellEditingStopped: function(event) {

						console.log('cellEditingStopped',event);
						if (event.data.subscription=="No" || event.data.subscription=="no"){
							event.data.subscription = 0
						}else{
							event.data.subscription = 1
						}
						
							$http.post(server + 'app/editaccount?email='+event.data.email+'&mobile='+event.data.mobile+'&firstname='+event.data.firstname+'&lastname='+event.data.lastname+'&fax='+event.data.fax+'&id='+event.data.id+'&company='+event.data.company+'&subscription='+event.data.subscription).success(function(response, status, headers) {
								console.log("product",response)
								localStorage.setItem("adminuserDetails",JSON.stringify(response.user))
							}).error(function(response, status, headers) {
							});
							
				},
					suppressRowClickSelection: true
			};
			
			 $scope.onModelUpdated = function() {
					var model = $scope.gridOptions.api.getModel();
					var totalRows = $scope.gridOptions.rowData.length;
					var processedRows = model.getRowCount();
					$scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
			}
		
			$scope.createRowData = function() {
					var rowData = [];
					for (var i = 0; i < $scope.model.length; i++) {
							rowData.push({
								id: $scope.model[i].id,	
								image: $scope.model[i].category_backgroudImage,
								image_to: $scope.model[i].image_to
							 });
					}
					console.log("row",$scope.gridOptions)
					// $scope.gridOptions.rowData =rowData
					$scope.gridOptions.api.setRowData(rowData)
					// return rowData;
			}
	
    });


    adminApp.controller('usersController', function($scope,$window,$http,$rootScope) {
		$rootScope.test = true
		var user   = JSON.parse(localStorage.getItem("adminuserDetails"))

			if(user){
				
			}else{
	
				$window.location.href = '#/login';
				
			}
			$scope.gridOptions = {}
			$scope.is_add = false
		$scope.getUser = function () {
			$http.get(server + 'admin/getuser?is_admin=1').success(function(response, status, headers) {
				$scope.model = response
				console.log($scope.model)
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});		
		};
		$scope.add = function(){
			if ($scope.is_add == false){
			$scope.is_add = true
			}else{
				$scope.is_add = false
			}
		}
		$scope.registerData = {"is_admin":"","firstName":"","lastName":"","mobile":"","fax":"","email":"","company":"","is_admin":0,"subscription":false,"street":"","pincode":"","city":"","country":"","password":"","confirmpassword":"","state":"","subcriptionYes":"","subcriptionNo":""}
		$scope.registerUser = function(){
			$http.post(server + 'app/register', $scope.registerData).success(function(response, status, headers) {
				$scope.is_add = false
				$scope.getUser();
				$scope.createRowData();
			}).error(function(response, status, headers) {
			
			});
		}

		$scope.getUser();
		
		var columnDefs = [
					
					
					{
						headerName: 'Basic Info',
							children: [
								{headerName: "Id",editable: false, field: "id",
											width: 150, pinned: true},
									{headerName: "First Name", field: "firstname",
											width: 150, pinned: true},
											{headerName: "Last Name", field: "lastname",
											width: 150, pinned: true},
									{headerName: "Email",editable: false, field: "email", width: 150, pinned: true,
											filterParams: { cellHeight: 20}},
							]
					},
					
					{
							headerName: 'Contact',
							children: [
									{headerName: "Mobile", field: "mobile", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Fax", field: "fax", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Company", field: "company", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Created At",editable: false, field: "createdAt", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Updated At",editable: false, field: "updatedAt", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Admin",editable: false, field: "admin", width: 150, filter: 'agTextColumnFilter'},
									{headerName: "Subscription", field: "subscription", width: 150, filter: 'agTextColumnFilter'},
							]
					}
			];

			$scope.gridOptions = {
					columnDefs: columnDefs,
					rowData: [],
					rowSelection: 'multiple',
					enableColResize: true,
					enableSorting: true,
					enableFilter: true,
					onModelUpdated: $scope.onModelUpdated,
					defaultColDef: {
						editable: true
					},
					onCellEditingStarted: function(event) {
						console.log('cellEditingStarted',event);
				},
				onCellEditingStopped: function(event) {

						console.log('cellEditingStopped',event);
						if (event.data.subscription=="No" || event.data.subscription=="no"){
							event.data.subscription = 0
						}else{
							event.data.subscription = 1
						}
						
							$http.post(server + 'app/editaccount?email='+event.data.email+'&mobile='+event.data.mobile+'&firstname='+event.data.firstname+'&lastname='+event.data.lastname+'&fax='+event.data.fax+'&id='+event.data.id+'&company='+event.data.company+'&subscription='+event.data.subscription).success(function(response, status, headers) {
								console.log("product",response)
								localStorage.setItem("adminuserDetails",JSON.stringify(response.user))
							}).error(function(response, status, headers) {
							});
							
				},
					suppressRowClickSelection: true
			};
			
			 $scope.onModelUpdated = function() {
					var model = $scope.gridOptions.api.getModel();
					var totalRows = $scope.gridOptions.rowData.length;
					var processedRows = model.getRowCount();
					$scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
			}
		
			$scope.createRowData = function() {
					var rowData = [];
					for (var i = 0; i < $scope.model.length; i++) {
							rowData.push({
								id: $scope.model[i].id,	
								firstname: $scope.model[i].firstName,
								lastname: $scope.model[i].lastName,
								email: $scope.model[i].email,
								mobile: $scope.model[i].mobile,
								fax: $scope.model[i].fax,
								company: $scope.model[i].company,
								createdAt: $scope.model[i].createdAt,
								updatedAt: $scope.model[i].updatedAt,
								admin: $scope.model[i].is_admin ? "yes" : "no",
								subscription: $scope.model[i].subscription ? "yes" : "no"
							 });
					}
					console.log("row",$scope.gridOptions)
					// $scope.gridOptions.rowData =rowData
					$scope.gridOptions.api.setRowData(rowData)
					// return rowData;
			}
			
	});


	adminApp.controller('ordersController', function($scope,$window,$http,$rootScope) {
		$rootScope.test = true
		var user   = JSON.parse(localStorage.getItem("adminuserDetails"))

			if(user){
				
			}else{
	
				$window.location.href = '#/login';
				
			}
			$scope.gridOptions = {}
		$scope.getAllOrders = function () {
			$http.get(server + 'app/getallorder').success(function(response, status, headers) {
				if(response.code == 200 || response.code == "200"){
					
					$scope.myorders = response.Orders
					$scope.gridOptions.api.setRowData($scope.myorders)

				}
				
			}).error(function(response, status, headers) {
			
			});	
		};

		$scope.getAllOrders();
		
		var columnDefs = [

			{headerName: "Order Id",editable: false, field: "id",width: 150, pinned: true ,cellRenderer:'agGroupCellRenderer'},
			{headerName: "Order Status", field: "orderStatus",width: 150, pinned: true},
			{headerName: "Order Value", field: "orderValue",width: 150, pinned: true},
			{headerName: "Payment Method", field: "paymentMethod",width: 150, pinned: true},
			{headerName: "First Name", field: "userDeatils.firstName",width: 150},
						{headerName: "Last Name", field: "userDeatils.lastName",width: 150},
						{headerName: "Address", field: "addressDeatils.streetAddress",width: 150},
						{headerName: "Mobile", field: "userDeatils.mobile",width: 150},
		                {headerName: "Email", field: "userDeatils.email",width: 150},
		                {headerName: "City", field: "addressDeatils.city",width: 150},
			
			
					
		

		

			];

			$scope.gridOptions = {
					columnDefs: columnDefs,
					rowData: [],
					masterDetail:true,
					rowSelection: 'multiple',
					enableColResize: true,
					enableSorting: true,
					enableFilter: true,
					onModelUpdated: $scope.onModelUpdated,
					defaultColDef: {
						editable: true
					},
					detailCellRendererParams: {
						detailGridOptions: {
							columnDefs: [
								{field: 'id'},
								{field: 'productCode'},
								{field: 'name'},
								{field: 'quantity'},
								{field: 'price'}
							],
							onGridReady: function(params) {
								params.api.sizeColumnsToFit();
							}
						},
						getDetailRowData: function(params) {
							console.log("parama::",params.data)
							params.successCallback(params.products);
						}
					},
					onCellEditingStarted: function(event) {
						console.log('cellEditingStarted',event);
				},
				onCellEditingStopped: function(event) {
							// $http.post(server + 'app/editaccount?email='+event.data.email+'&mobile='+event.data.mobile+'&firstname='+event.data.firstname+'&lastname='+event.data.lastname+'&fax='+event.data.fax+'&id='+event.data.id+'&company='+event.data.company+'&subscription='+event.data.subscription).success(function(response, status, headers) {
							// 	console.log("product",response)
							// 	localStorage.setItem("adminuserDetails",JSON.stringify(response.user))
							// }).error(function(response, status, headers) {
							// });
							
				},
					suppressRowClickSelection: true
			};
			
			 $scope.onModelUpdated = function() {
					var model = $scope.gridOptions.api.getModel();
					var totalRows = $scope.gridOptions.rowData.length;
					var processedRows = model.getRowCount();
					$scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
			}
		
			$scope.createRowData = function() {
					// var rowData = [];
					// for (var i = 0; i < $scope.model.length; i++) {
					// 		rowData.push({
					// 			id: $scope.model[i].id,	
					// 			address: $scope.model[i].firstName,
								
					// 		 });
					// }
					// console.log("row",$scope.gridOptions)
					// // $scope.gridOptions.rowData =rowData
					// $scope.gridOptions.api.setRowData(rowData)
					// // return rowData;
			}
			
	});
		
		
	
    
adminApp.controller('update_webContent', function($scope,$window,$http,$rootScope) {
	$rootScope.test = true
	var user   = JSON.parse(localStorage.getItem("adminuserDetails"))

	if(user){

	}else{

		$window.location.href = '#/login';

	}
	$scope.is_add_about = false
	$scope.addAboutEnable = function(){
		if ($scope.is_add_about){
			$scope.is_add_about = false
		}else{
			$scope.is_add_about = true
		}
	}
	
	$scope.getAbout = function () {
		$http.get(server + 'app/getabout').success(function(response, status, headers) {
			$scope.getAboutData = response
			console.log($scope.getAboutData)
		}).error(function(response, status, headers) {
		
		});		
	};
	$scope.getAbout();
	$scope.aboutData = {"my_header":"","my_body":""}
	$scope.addAbout = function(){
		$http.get(server + 'admin/setabout?header='+$scope.aboutData.my_header+'&body='+$scope.aboutData.my_body).success(function(response, status, headers) {
			console.log(response)
			$scope.is_add_about = false
			$scope.getAbout();
		}).error(function(response, status, headers) {
		
		});
	}
	// ***********************
	$scope.is_add_testemonial = false
	$scope.addtestemonialEnable = function(){
		if ($scope.is_add_testemonial){
			$scope.is_add_testemonial = false
		}else{
			$scope.is_add_testemonial = true
		}
	}
	
	$scope.gettestemonial = function () {
		$http.get(server + 'app/gettestemonials').success(function(response, status, headers) {
			$scope.gettestemonialData = response.data
			console.log($scope.gettestemonialData)
		}).error(function(response, status, headers) {
		
		});		
	};
	$scope.gettestemonial();
	$scope.testemonialData = {"name":"","profession":"","message":"","image":""}
	$scope.addtestemonial = function(){
		$http.post(server + 'admin/settestemonials',$scope.testemonialData).success(function(response, status, headers) {
			console.log(response)
			$scope.is_add_testemonial = false
			$scope.gettestemonial();
		}).error(function(response, status, headers) {
		
		});
	}
});

adminApp.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});
