// tabs.js
(function() {
    'use strict';

    angular
        .module('app.tab')
        .controller('TabCtrl', TabCtrl);

    TabCtrl.$inject = ['$rootScope', '$scope', '$ionicModal', '$ionicLoading',
        '$timeout', 'Firebase', 'Users'
    ];
    function TabCtrl($rootScope, $scope, $ionicModal, $ionicLoading,
        $timeout, Firebase, Users) {

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

            Firebase.auth().$onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    console.info('Signed in... '); // + user.uid);
                    $scope.loginData.email = ""; // clear email on success
                    $scope.closeLogin();
                    $scope.error.show = false;
                    // save the authed user
                    Users.load();
                    Users.get(user.uid).then(function(user) {
                        $rootScope.user = user;
                    });
                }
                else {
                    // No user is signed in.
                    console.info('Not Authenticated');
                    $scope.login();

                    Users.unload();
                    $rootScope.user = null;
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

            Firebase.auth().$signInWithEmailAndPassword($scope.loginData.email,
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
            Firebase.auth().$signOut();
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
    }
})();