/* app.js */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('lincoln-gps', ['ionic', 'map.controller', 'directory.controller',
    'account.controller', 'tab.controller', 'firebase.services', 'ion-search-select.directive',
    'starter.controllers', 'starter.services'
])

.run(function($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function() {
        console.info('Ionic Charged!'); // log that ionic is ready and running

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // graphing object for global variables
        Graphing = {
            graph: null,
            source: null,
            target: null,
            setSource: true
        };

        // define fitlers (all initially true)
        $rootScope.filters = {
            office: true,
            desk: true,
            broom: true,
            cubicle: true,
            conf: true
        };

        // load graph from json
        $.getJSON('lib/graph/graph.json', function(data) {
            Graphing.graph = new Graph(data);
        });

        // Initialize Firebase with credentials
        const CONFIG = {
            apiKey: "AIzaSyBJmytcwYLNjfjPp4beCPewJ6XKE7mRYJs",
            authDomain: "lincoln-gps.firebaseapp.com",
            databaseURL: "https://lincoln-gps.firebaseio.com",
            storageBucket: "lincoln-gps.appspot.com",
        };
        firebase.initializeApp(CONFIG);

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
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
                    controller: 'MapCtrl'
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
                    controller: 'DirectoryCtrl'
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
                    controller: 'AccountCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/map');
});
