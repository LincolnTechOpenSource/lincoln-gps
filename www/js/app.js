/* app.js */
(function() {
    'use strict';

    // array of department class names
    var DEPARTMENT_NAMES = [
        'account_setup', 'accounting', 'acd', 'asset_mgmt', 'branch_dev', 'branch_serv',
        'broom', 'busi_dev', 'compli_licens', 'conf', 'copy_scan_rm', 'doc_mgmt', 'elevator_exit',
        'euc', 'exec_suite', 'facilities', 'finance', 'food', 'hr', 'isd', 'im_r', 'isa',
        'mrkt_comm', 'one_time_financials', 'ops', 'prvd_mgmt', 'quality_cntrl',
        'reception', 'rdi', 'retire_serv', 'stairs_exit', 'tpa', 'vsa'
        //'break_area'
    ];

    angular
        .module('app', ['ionic', 'map.controller', 'directory.controller',
            'app.account', 'tab.controller', 'firebase.service', 'ion-search-select.directive',
            'location-info.directive', 'starter.controllers', 'starter.services', 'firebase', 'graph.service'
        ])
        .run(appRun)
        .config(appConfigure)
        .constant('DEPARTMENT_NAMES', DEPARTMENT_NAMES);


    appRun.$inject = ['$rootScope', '$ionicPlatform', '$window', 'Graphing', 'Firebase'];

    function appRun($rootScope, $ionicPlatform, $window, Graphing, Firebase) {
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
            Graphing.debug = true; // debug for testing purposes
            Graphing.createGraph()
                .then(function() {
                    console.info('Successfully created graph!');
                })
                .catch(function(error) {
                    console.error(error);
                });

            // Initialize Firebase
            Firebase.init();
        });
    }

    function appConfigure($stateProvider, $urlRouterProvider) {
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'TabCtrl'
            })
            // Each tab has its own nav history stack:
            .state('tab.map', {
                url: '/map',
                cache: false,
                views: {
                    'tab-map': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    employee: {
                        value: null
                    }
                }
            })
            .state('tab.directory', {
                url: '/directory',
                views: {
                    'tab-directory': {
                        templateUrl: 'templates/tab-directory.html',
                        controller: 'DirectoryCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
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
    return $http.get('/userSession/', {cache: false});
  }
*/