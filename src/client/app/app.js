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
    function appRun($rootScope, $state, $ionicPlatform, $window, $log, Firebase, localStorage, DEFAULT_FILTERS) {
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

            // load/set local storage preferences
            $rootScope.prefs.filters = localStorage.get('filters');
            if (!$rootScope.prefs.filters) {
                $rootScope.prefs.filters = DEFAULT_FILTERS;
                localStorage.set('filters', DEFAULT_FILTERS);
            }
            $rootScope.prefs.showMapPopup = localStorage.get('showMapPopup');
            if (!$rootScope.prefs.showMapPopup) {
                $rootScope.prefs.showMapPopup = true; // default to true
                localStorage.set('showMapPopup', true);
            }
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === 'AUTH_REQUIRED') {
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