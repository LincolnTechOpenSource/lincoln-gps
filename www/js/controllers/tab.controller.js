angular.module('tab.controller', [])

.controller('TabCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, Auth) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {
        email: "",
        password: ""
    };

    // Error messages for login
    $scope.error = {
        show: false,
        message: null,
        code: null
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/modal-login.html', {
        scope: $scope,
        backdropClickToClose: false,
        hardwareBackButtonClose: false
    }).then(function(modal) {
        $scope.modal = modal;

        Auth.$onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log('Signed in... ' + user.uid);
                $scope.loginData.email = ""; // clear email on success
                $scope.modal.hide();

                $scope.error.show = false;
            }
            else {
                // No user is signed in.
                console.log('Not Authenticated');
                $scope.modal.show();
            }
        });
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
        $ionicLoading.show({
            template: 'Signing In...'
        });

        Auth.$signInWithEmailAndPassword($scope.loginData.email,
            $scope.loginData.password).catch(function(error) {
            // Handle Errors here
            console.log("Authentication failed (" + error.code + "): " + error.message);
            _handleError(error);
        }).then(function() {
            // reset login form
            $scope.loginData.password = "";
            $timeout(function() {
                $ionicLoading.hide();
            }, 100);
        });
    };

    $scope.logout = function() {
        Auth.$signOut();
    };


    /**
     * _handleError: helper function to handle a firebase authentication error
     */
    function _handleError(error) {
        var emailField = $('#login-modal #login-email');
        var passwordField = $('#login-modal #login-password');

        switch (error.code) {
            // badly formatted email
            case 'auth/invalid-email':
                emailField.addClass('has-error');
                passwordField.removeClass('has-error');

                $scope.error.code = error.code;
                $scope.error.message = "Please enter a valid email";
                $scope.error.show = true;
                break;

                // do not distinguish between bad password and bad user
            case 'auth/user-disabled':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                emailField.addClass('has-error');
                passwordField.addClass('has-error');

                $scope.error.code = error.code;
                $scope.error.message = "Invalid Email / Password Combination";
                $scope.error.show = true;
                break;

                // firebase says the code should be one of the above
            default:
                console.alert('Invalid Return Type... Firebase error!');
                break;
        }
    }
});