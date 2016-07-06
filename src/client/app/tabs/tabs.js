// tabs.js
(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.controller:TabCtrl
     * @description
     * # Tab Controller
     */
    angular
        .module('app.tab')
        .controller('TabCtrl', TabCtrl);

    // TabCtrl.$inject = ['$rootScope', '$scope', '$ionicModal', '$ionicLoading',
    //     '$timeout', '$q', '$log', 'Firebase', 'Users', 'currentUser'
    // ];
    /* @ngInject */
    function TabCtrl($rootScope, $scope, $ionicModal, $ionicLoading,
        $timeout, $q, $log, Firebase, Users, localStorage, currentUser) {

        // Form data for the login modal
        $scope.loginData = {
            email: '',
            password: ''
        };

        // Error messages for login
        $scope.error = {
            show: false,
            message: null,
            code: null
        };

        // Create the login modal that we will use later
        $ionicModal
            .fromTemplateUrl('app/tabs/modal-login.html', {
                scope: $scope,
                backdropClickToClose: false,
                hardwareBackButtonClose: false
            })
            .then(function(modal) {
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

        // Login action
        $scope.doLogin = doLogin;

        // Log out
        $scope.logout = function() {
            Firebase.auth().$signOut();
        };

        Firebase.auth().$onAuthStateChanged(userAuth);

        //------------------------------------------------//

        /** handle user authentication */
        function userAuth(user) {
            if (user) {
                // User is signed in.
                $log.info('Signed in... '); // + user.uid);

                if (!!$scope.loginData.email) {
                    $scope.closeLogin();
                }
                $scope.loginData.email = ''; // clear email on success
                $scope.error.show = false;

                // load & save the authed user
                load(user);
            }
            else {
                // No user is signed in.
                $log.info('Not Authenticated');
                $scope.login();

                Users.unload();
                $rootScope.user = null;
            }
        }

        /** load the Users table */
        function load(user) {
            if (Users.loaded()) {
                // $rootScope.user = Users.get(user.uid);
                localStorage.set('user', Users.get(user.uid));
                return true;
            }
            else {
                // var promises = [get(user)];
                return Users.load().then(function() {

                    // $rootScope.user = Users.get(user.uid);
                    localStorage.set('user', Users.get(user.uid));
                    $log.info('User Loaded');
                    console.log(localStorage.get('user'));
                });
            }
        }

        // Perform the login action when the user submits the login form
        function doLogin() {
            $ionicLoading.show({
                template: 'Signing In...'
            });

            Firebase.auth().$signInWithEmailAndPassword($scope.loginData.email,
                $scope.loginData.password).catch(function(error) {
                // Handle Errors here
                $log.log('Authentication failed (' + error.code + '): ' + error.message);
                _handleError(error);
            }).then(function() {
                // reset login form
                $scope.loginData.password = '';
                $timeout(function() {
                    $ionicLoading.hide();
                }, 100);
            });
        }

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
                    $scope.error.message = 'Please enter a valid email';
                    $scope.error.show = true;
                    break;

                    // do not distinguish between bad password and bad user
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    emailField.addClass('has-error');
                    passwordField.addClass('has-error');

                    $scope.error.code = error.code;
                    $scope.error.message = 'Invalid Email / Password Combination';
                    $scope.error.show = true;
                    break;

                    // firebase says the code should be one of the above
                default:
                    $log.alert('Invalid Return Type... Firebase error!');
                    break;
            }
        }
    }
})();