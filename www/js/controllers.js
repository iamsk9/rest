angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,signService, $ionicNavBarDelegate,signinService,Backand, $http, $rootScope, $ionicPopup, itemsService, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $rootScope.$broadcast('authorized');
  $scope.loginData = {};

  $scope.isLogin = true;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  var vm = this;
  vm.doSignUp = doSignUp;
  vm.doLogin  = doLogin;
  vm.openDishes = openDishes;
  vm.place_order = place_order;
  vm.getRest = getRest;
  vm.openRestaurant = openRestaurant;
  vm.otp = otp;
  vm.goToLogin = goToLogin;
  vm.goToRegister = goToRegister;
  $scope.list_dets = [];
  vm.order = order;


    function order() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Your order will be Placed',
        template: 'If You click ok the order cannot be cancelled'
      });

      confirmPopup.then(function(res) {
     if(res) {
       var i = 0;
       $scope.list_items = itemsService.getSelectedItems();
       console.log(vm.object.name);
       for(i=0;i<$scope.list_items.length;i++){
         itemsService.placeOrder(vm.object, $scope.list_items[i]);
       }
       var alertPopup = $ionicPopup.alert({
         title: 'Thank You...',
         template: "Your Order has been placed.<br>Get Ready to enjoy."
        });
        $state.go('app.restaurants');
        $ionicNavBarDelegate.showBackButton(false);
      }
      else {
        $state.go('app.');
        $ionicNavBarDelegate.showBackButton(false);
      }
      });
    }

  function openRestaurant(id) {
    /*console.log(id);
    itemsService.getItems(id)
    .then(function(result){
      //$scope.items = result.data.data;
      results = result.data.data;
      for(var i = 0;i<result.data.data.length;i++)
      {
        itemsService.getItemDetails(results[i]['item_id'])
        .then(function(result){
          $scope.list_dets.push(result.data.data);
          console.log(result.data.data);
          console.log($scope.list_dets);
          $state.go('app.rest_items');
        });
      }
    });*/
    $state.go('app.rest_items');
  }

  function goToLogin(){
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.signin');
  }

  function goToRegister(){
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.signup');
  }

  function otp() {
    if(vm.otpobject.otpp.length==4){
      $state.go('app.signin');
      $ionicNavBarDelegate.showBackButton(false);
        var alertPopup = $ionicPopup.alert({
          title: 'Thank You!',
          template: 'Login Now'
        });
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Invalid!',
        template: 'Wrong Otp'
      });
    }
  }

  function getRest() {
      itemsService.getRestaurants()
        .then(function(result){
          $scope.restaurants = result.data.data;
        });
  }
  getRest();

  //Login function
  function doLogin() {
    $scope.isLogin = true;
    $state.go('app.restaurants');
    $ionicNavBarDelegate.showBackButton(false);

    /*signinService.logining(vm.loginData.email)
        .then(function (result) {

          if(vm.loginData.password == result.password){
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for Logining In...'
          });
          vm.loginData.email = '';
          vm.loginData.password = '';
          $ionicNavBarDelegate.showBackButton(false);
          $state.go('app.restaurants');
          $scope.isLogin = true;
        }else {
          var invaliPopup = $ionicPopup.alert({
            title: 'OOPS!',
            template: 'Invalid Username or Password'
          });
        }
      });*/
  }

  function openDishes() {
    $scope.list_items = itemsService.getSelectedDishes();
    console.log($scope.list_items);
  }

  function place_order() {
    $state.go('app.cost');
  }

  // Perform the login action when the user submits the login form
  function doSignUp() {
    signService.addMember(vm.object)
        .then(function (result) {
          $state.go('app.otp');

        });
  }
})
.controller('CategoryCtrl', function($scope) {
  $scope.categories = [
    { image: 'img/p1.jpg', name: 'French Cusine',id: 1 },
    { image: 'img/p2.jpeg', name: 'Indian Thalli',id: 2 },
    { image: 'img/p3.jpg', name: 'BreakFast',id: 3 },
    { image: 'img/p4.jpg', name: 'Western Cusine',id: 4 },
    { image: 'img/p5.jpg', name: 'South Indian',id: 5 },
    { image: 'img/p6.jpg', name: 'Biryani',id: 6 }
  ];
})
/*ListCtrl for the list.html page*/
.controller('ListCtrl', function($scope, itemsService, $ionicPopup) {
  $scope.list_item = [];

  itemsService.getTodos()
  .then(function (result) {
    $scope.list_items = result.data.data;
    itemsService.saveList(result.data.data);
  });

  $scope.clicked = function (id) {
    itemsService.selectedDish(id);
  };
})
/*Signin controller for the signup.html page*/
.controller('SigninCtrl', function($scope, $ionicModal, $timeout, signinService, Backand, $http, $rootScope, $ionicPopup) {
  var vm = this;
  vm.doLogin  = doLogin;

  //Login function
  function doLogin() {
    signinService.logining(vm.loginData.email)
        .then(function (result) {
          var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for Logining In...'
          });
          console.log($rootScope.user_name);
          //$rootScope.user_name = result.name;
          vm.loginData.email = '';
          vm.loginData.password = '';
        });
  }
})
.controller('OrderCtrl', function($scope, Backand, $http, $ionicPopup, $state, $location) {
  $scope.order = function () {
    var alertPopup = $ionicPopup.alert({
      title: 'Thank You...',
      template: "Your Order has been placed.<br>Get Ready to enjoy."
    });
    $location.path('#/app/list');
  };
})
.controller('RestCtrl', function($scope, Backand, $http, $ionicPopup, $state, itemsService, $location, $ionicNavBarDelegate) {

  itemsService.getDishes()
  .then(function(result){
    console.log(result.data.data);
    $scope.list_dets = result.data.data;
    itemsService.savedetList($scope.list_dets);
  });

    $scope.item_clicked = function (id) {
      itemsService.selectedItem(id);
    };
    $scope.list_items = null;

    $scope.select_item = function(id){
      console.log(id);
    };

    $scope.place_order = function(id){
      $scope.list_items = itemsService.getSelectedItems();
      console.log($scope.list_items);
      $state.go('app.cost');
      $ionicNavBarDelegate.showBackButton(false);
    };
})
.controller('CostCtrl', function($scope, itemsService, $state){
  $scope.cart_items = itemsService.getSelectedItems();
  console.log($scope.cart_items);

  var sum = 0;
  for(i=0;i<$scope.cart_items.length;i++)
    sum = sum + parseInt($scope.cart_items[i].cost);

    $scope.total = sum;
    $scope.tax = sum * 0.05;
    $scope.bill = sum + $scope.tax;

  $scope.proceed_payment = function(){
    $state.go('app.address');
  };
})
.controller('HomeController', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {
   var vm = this;
   vm.scan = function(){
   $ionicPlatform.ready(function() {
       $cordovaBarcodeScanner
         .scan()
         .then(function(result) {
         // Success! Barcode data is here
         vm.scanResults = "We got a barcode\n" +
         "Result: " + result.text + "\n" +
         "Format: " + result.format + "\n" +
         "Cancelled: " + result.cancelled;
        }, function(error) {
        // An error occurred
        vm.scanResults = 'Error: ' + error;
        });
      });
    };
    vm.scanResults = '';
  });
