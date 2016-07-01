(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name app
     * @description
     * # Initializes main application and routing
     *
     * Main module of the application.
     */
    angular
        .module('app', ['ionic', 'app.map', 'app.directory', 'app.account',
            'app.tab', 'app.loc', 'app.core'
        ])
        .run(appRun)
        .config(appConfigure);

    /* @ngInject */
    function appRun($rootScope, $state, $ionicPlatform, $window, $log, Firebase) {
        $ionicPlatform.ready(function() {
            $log.info('Ionic Charged!'); // log that ionic is ready and running

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
                /* global cordova */
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if ($window.StatusBar) {
                // org.apache.cordova.statusbar required
                /* global StatusBar */
                StatusBar.styleDefault();
            }

            /* define fitlers
             * dispName is the name to show in the toggle view
             * disp is the truth-value of whether to display or not
             */
            // $rootScope.filters = {}

            // Initialize Firebase
            // Firebase.init();
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === 'AUTH_REQUIRED') {
                // $log.log('HEY!');
                $state.go('tab.account');
            }
        });
    }

    appConfigure.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appConfigure($stateProvider, $urlRouterProvider) {
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'app/tabs/tabs.html',
                controller: 'TabCtrl',
                controllerAs: 'tab',
                resolve: {
                    // Initialize Firebase
                    init: ['Firebase', function(Firebase) {
                        return Firebase.init();
                    }],
                    currentUser: ['Firebase', function(Firebase) {
                        return Firebase.auth().$waitForSignIn();
                    }]
                }
            })
            // Each tab has its own nav history stack:
            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-map': {
                        templateUrl: 'app/map/map.html',
                        controller: 'MapCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    currentUser: ['Firebase', function(Firebase) {
                        return Firebase.auth().$requireSignIn();
                    }]
                }
            })
            .state('tab.directory', {
                url: '/directory',
                views: {
                    'tab-directory': {
                        templateUrl: 'app/directory/directory.html',
                        controller: 'DirectoryCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    currentUser: ['Firebase', function(Firebase) {
                        return Firebase.auth().$requireSignIn();
                    }]
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'app/account/account.html',
                        controller: 'AccountCtrl',
                        controllerAs: 'vm'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/map');
    }
})();


/*
// Manually Bootstrap App

var initInjector = angular.injector(['ng']);
var $http = initInjector.get('$http');
var $q = initInjector.get('$q');

$q.all([getUserSession()]) // Get userToken and userSession
    .then(function(data) {
        angular.module('aws')
            .constant('USERSESSION', data[0].data) // Save userSession as constant
            .value('appPreferences', {
                datalevel: null,
                searchMethod: null,
            });

        angular.element(document).ready(function() { // manually bootstrap
            angular.bootstrap(document, ['aws']);
        });
    });

function getUserSession() {
    return $http.get('/userSession/', {
        cache: false
    });
}
*/

// angular.module('app', ['ionic', 'ngCordova', 'ngResource'])

//   .run(function($ionicPlatform) {

//     $ionicPlatform.ready(function() {
//       // save to use plugins here
//     });

//     // add possible global event handlers here

//   })

//   .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
//     // register $http interceptors, if any. e.g.
//     // $httpProvider.interceptors.push('interceptor-name');

//     // Application routing
//     $stateProvider
//       .state('app', {
//         url: '/app',
//         abstract: true,
//         templateUrl: 'templates/main.html',
//         controller: 'MainController'
//       })
//       .state('app.home', {
//         url: '/home',
//         cache: true,
//         views: {
//           'viewContent': {
//             templateUrl: 'templates/views/home.html',
//             controller: 'HomeController'
//           }
//         }
//       })
//       .state('app.settings', {
//         url: '/settings',
//         cache: true,
//         views: {
//           'viewContent': {
//             templateUrl: 'templates/views/settings.html',
//             controller: 'SettingsController'
//           }
//         }
//       });


//     // redirects to default route for undefined routes
//     $urlRouterProvider.otherwise('/app/home');
//   });
