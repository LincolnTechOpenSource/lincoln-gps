/* app.js */
(function() {
    'use strict';

    angular
        .module('app', ['ionic', 'app.map', 'app.directory', 'app.account',
            'app.tab', 'firebase.service', 'params.service'
        ])
        .run(appRun)
        .config(appConfigure);

    appRun.$inject = ['$rootScope', '$state', '$ionicPlatform', '$window', 'Graphing', 'Firebase'];
    function appRun($rootScope, $state, $ionicPlatform, $window, Graphing, Firebase) {
        $ionicPlatform.ready(function() {
            console.info('Ionic Charged!'); // log that ionic is ready and running

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if ($window.cordova && $window.cordova.plugins && $window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if ($window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            // should we show the select on map info popup? (default true)
            $rootScope.showMapPopup = true;

            /* define fitlers
             * dispName is the name to show in the toggle view
             * disp is the truth-value of whether to display or not
             */
            $rootScope.filters = {
                office: {
                    dispName: "Offices",
                    disp: true
                },
                desk: {
                    dispName: "Desks",
                    disp: true
                },
                broom: {
                    dispName: "Bathrooms",
                    disp: true
                },
                cubicle: {
                    dispName: "Cubicles",
                    disp: true
                },
                conf: {
                    dispName: "Conference Rooms",
                    disp: true
                },
                wbroom: {
                    dispName: "Woman's Bathrooms",
                    disp: true
                }
            };

            // initialize & create graph
            // Graphing.debug = true; // debug for testing purposes
            Graphing.createGraph()
                .catch(function(error) {
                    console.error(error);
                });

            // Initialize Firebase
            Firebase.init();
        });

        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $state.go("tab.map");
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
                templateUrl: 'templates/tabs.html',
                controller: 'Tab',
                controllerAs: 'tab'
            })
            // Each tab has its own nav history stack:
            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-map': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['Firebase', function(Firebase) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return Firebase.auth().$waitForSignIn();
                    }]
                }
            })
            .state('tab.directory', {
                url: '/directory',
                views: {
                    'tab-directory': {
                        templateUrl: 'directory/directory.html',
                        controller: 'Directory',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'account/account.html',
                        controller: 'Account',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForSignIn resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    "currentAuth": ["Firebase", function(Firebase) {
                        // $requireSignIn returns a promise so the resolve waits for it to complete
                        // If the promise is rejected, it will throw a $stateChangeError (see above)
                        return Firebase.auth().$requireSignIn();
                    }]
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
    return $http.get('/userSession/', {cache: false});
  }
*/