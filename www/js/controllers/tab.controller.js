angular.module('tab.controller', [])

.controller('TabCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, Auth) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/modal-login.html', {
        scope: $scope,
        backdropClickToClose: false,
        hardwareBackButtonClose: false
    }).then(function(modal) {
        $scope.modal = modal;

        //console.log(Auth.currentUser);
        // force login if not signed in
        if (!Auth.currentUser) {
            $scope.modal.show();
        }
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        if ($scope.loginData && $scope.loginData.email && $scope.loginData.password) {
            $ionicLoading.show({
                template: 'Signing In...'
            });

            Auth.$signInWithEmailAndPassword($scope.loginData.email,
                $scope.loginData.password).catch(function(error) {
                // Handle Errors here.
                console.log("Authentication failed (" + error.code + "): " + error.message);
                $timeout(function() {
                    $ionicLoading.hide()
                }, 100);
                // ...
            });
        }
        else {
            alert("Please enter email and password both");
        }
    };

    Auth.$onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('hi');
        }
        else {
            // No user is signed in.
            console.log('out');
        }
    });
});