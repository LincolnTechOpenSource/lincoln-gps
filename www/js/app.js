/* app.js */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('lincoln-gps', ['ionic', 'map.controller', 'directory.controller',
    'account.controller', 'tab.controller', 'firebase.services', 'ion-search-select.directive',
    'location-info.directive', 'starter.controllers', 'starter.services'
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
        $rootScope.Graphing = {
            graph: null,
            source: null,
            target: null,
            setSource: true
        };

        /* define fitlers
         * dispName is the name to show in the toggle view
         * disp is the truth-value of whether to display or not
         */
        $rootScope.filters = {
            office: { dispName: "Offices", disp: true},
            desk: { dispName: "Desks", disp: true},
            broom: { dispName: "Bathrooms", disp: true},
            cubicle: { dispName: "Cubicles", disp: true},
            conf: { dispName: "Conference Rooms", disp: true},
            wbroom: { dispName: "Woman's Bathrooms", disp:true}
        };

        // load graph from json
        //$.getJSON('lib/graph/graph.json', function(data) {
            $rootScope.Graphing.graph = new Graph({
    "_nodes": {
        "1":{"_id":1,"_neighbors":[1001],"_weight":0,"_nType":5},
        "2":{"_id":2,"_neighbors":[1007],"_weight":0,"_nType":5},
        "3":{"_id":3,"_neighbors":[1009],"_weight":0,"_nType":5},
        "4":{"_id":4,"_neighbors":[1031],"_weight":0,"_nType":5},
        "5":{"_id":5,"_neighbors":[1047],"_weight":0,"_nType":5},
        "6":{"_id":6,"_neighbors":[1002],"_weight":0,"_nType":5},
        "7":{"_id":7,"_neighbors":[1004],"_weight":0,"_nType":5},
        "8":{"_id":8,"_neighbors":[1006],"_weight":0,"_nType":5},
        "9":{"_id":9,"_neighbors":[1015],"_weight":0,"_nType":5},
        "10":{"_id":10,"_neighbors":[1017],"_weight":0,"_nType":5},
        "11":{"_id":11,"_neighbors":[1018],"_weight":0,"_nType":5},
        "12":{"_id":12,"_neighbors":[1019],"_weight":0,"_nType":5},
        "13":{"_id":13,"_neighbors":[1020],"_weight":0,"_nType":5},
        "14":{"_id":14,"_neighbors":[1022],"_weight":0,"_nType":5},
        "15":{"_id":15,"_neighbors":[1045],"_weight":0,"_nType":5},
        "16":{"_id":16,"_neighbors":[1062],"_weight":0,"_nType":5},
        "17":{"_id":17,"_neighbors":[1002],"_weight":0,"_nType":5},
        "18":{"_id":18,"_neighbors":[1003],"_weight":0,"_nType":5},
        "19":{"_id":19,"_neighbors":[1004],"_weight":0,"_nType":5},
        "20":{"_id":20,"_neighbors":[1005],"_weight":0,"_nType":5},
        "21":{"_id":21,"_neighbors":[1006],"_weight":0,"_nType":5},
        "22":{"_id":22,"_neighbors":[1010],"_weight":0,"_nType":5},
        "23":{"_id":23,"_neighbors":[1011],"_weight":0,"_nType":5},
        "24":{"_id":24,"_neighbors":[1012],"_weight":0,"_nType":5},
        "25":{"_id":25,"_neighbors":[1013],"_weight":0,"_nType":5},
        "26":{"_id":26,"_neighbors":[1014],"_weight":0,"_nType":5},
        "27":{"_id":27,"_neighbors":[1015],"_weight":0,"_nType":5},
        "28":{"_id":28,"_neighbors":[1016],"_weight":0,"_nType":5},
        "29":{"_id":29,"_neighbors":[1017],"_weight":0,"_nType":5},
        "30":{"_id":30,"_neighbors":[1018],"_weight":0,"_nType":5},
        "31":{"_id":31,"_neighbors":[1023],"_weight":0,"_nType":5},
        "32":{"_id":32,"_neighbors":[1024],"_weight":0,"_nType":5},
        "33":{"_id":33,"_neighbors":[1025],"_weight":0,"_nType":5},
        "34":{"_id":34,"_neighbors":[1026],"_weight":0,"_nType":5},
        "35":{"_id":35,"_neighbors":[1010],"_weight":0,"_nType":5},
        "36":{"_id":36,"_neighbors":[1011],"_weight":0,"_nType":5},
        "37":{"_id":37,"_neighbors":[1012],"_weight":0,"_nType":5},
        "38":{"_id":38,"_neighbors":[1013],"_weight":0,"_nType":5},
        "39":{"_id":39,"_neighbors":[1014],"_weight":0,"_nType":5},
        "40":{"_id":40,"_neighbors":[1033],"_weight":0,"_nType":5},
        "41":{"_id":41,"_neighbors":[1034],"_weight":0,"_nType":5},
        "42":{"_id":42,"_neighbors":[1035],"_weight":0,"_nType":5},
        "43":{"_id":43,"_neighbors":[1036],"_weight":0,"_nType":5},
        "44":{"_id":44,"_neighbors":[1037],"_weight":0,"_nType":5},
        "45":{"_id":45,"_neighbors":[1023],"_weight":0,"_nType":5},
        "46":{"_id":46,"_neighbors":[1024],"_weight":0,"_nType":5},
        "47":{"_id":47,"_neighbors":[1025],"_weight":0,"_nType":5},
        "48":{"_id":48,"_neighbors":[1026],"_weight":0,"_nType":5},
        "49":{"_id":49,"_neighbors":[1040],"_weight":0,"_nType":5},
        "50":{"_id":50,"_neighbors":[1041],"_weight":0,"_nType":5},
        "51":{"_id":51,"_neighbors":[1042],"_weight":0,"_nType":5},
        "52":{"_id":52,"_neighbors":[1043],"_weight":0,"_nType":5},
        "53":{"_id":53,"_neighbors":[1033],"_weight":0,"_nType":5},
        "54":{"_id":54,"_neighbors":[1050],"_weight":0,"_nType":5},
        "55":{"_id":55,"_neighbors":[1034],"_weight":0,"_nType":5},
        "56":{"_id":56,"_neighbors":[1035],"_weight":0,"_nType":5},
        "57":{"_id":57,"_neighbors":[1036],"_weight":0,"_nType":5},
        "58":{"_id":58,"_neighbors":[1037],"_weight":0,"_nType":5},
        "59":{"_id":59,"_neighbors":[1051],"_weight":0,"_nType":5},
        "60":{"_id":60,"_neighbors":[1052],"_weight":0,"_nType":5},
        "61":{"_id":61,"_neighbors":[1053],"_weight":0,"_nType":5},
        "62":{"_id":62,"_neighbors":[1054],"_weight":0,"_nType":5},
        "63":{"_id":63,"_neighbors":[1040],"_weight":0,"_nType":5},
        "64":{"_id":64,"_neighbors":[1041],"_weight":0,"_nType":5},
        "65":{"_id":65,"_neighbors":[1042],"_weight":0,"_nType":5},
        "66":{"_id":66,"_neighbors":[1043],"_weight":0,"_nType":5},
        "67":{"_id":67,"_neighbors":[1057],"_weight":0,"_nType":5},
        "68":{"_id":68,"_neighbors":[1058],"_weight":0,"_nType":5},
        "69":{"_id":69,"_neighbors":[1059],"_weight":0,"_nType":5},
        "70":{"_id":70,"_neighbors":[1060],"_weight":0,"_nType":5},

        "1001":{"_id":1001,"_neighbors":[1,1002,1007],"_weight":1,"_nType":3},
        "1002":{"_id":1002,"_neighbors":[6,17,1001,1003],"_weight":1,"_nType":3},
        "1003":{"_id":1003,"_neighbors":[18,1002,1004],"_weight":1,"_nType":3},
        "1004":{"_id":1004,"_neighbors":[7,19,1003,1005],"_weight":1,"_nType":3},
        "1005":{"_id":1005,"_neighbors":[20,1004,1006],"_weight":1,"_nType":3},
        "1006":{"_id":1006,"_neighbors":[8,21,1005,1027],"_weight":1,"_nType":3},
        "1007":{"_id":1007,"_neighbors":[2,1001,1008],"_weight":1,"_nType":3},
        "1008":{"_id":1008,"_neighbors":[1007,1009],"_weight":1,"_nType":3},
        "1009":{"_id":1009,"_neighbors":[3,1008,1010,1030],"_weight":1,"_nType":3},
        "1010":{"_id":1010,"_neighbors":[22,35,1009,1011],"_weight":1,"_nType":3},
        "1011":{"_id":1011,"_neighbors":[23,36,1010,1012],"_weight":1,"_nType":3},
        "1012":{"_id":1012,"_neighbors":[24,37,1011,1013],"_weight":1,"_nType":3},
        "1013":{"_id":1013,"_neighbors":[25,38,1012,1014],"_weight":1,"_nType":3},
        "1014":{"_id":1014,"_neighbors":[26,39,1013,1029],"_weight":1,"_nType":3},
        "1015":{"_id":1015,"_neighbors":[9,27,1027,1016],"_weight":1,"_nType":3},
        "1016":{"_id":1016,"_neighbors":[28,1015,1017],"_weight":1,"_nType":3},
        "1017":{"_id":1017,"_neighbors":[29,10,1016,1018],"_weight":1,"_nType":3},
        "1018":{"_id":1018,"_neighbors":[30,11,1017,1019],"_weight":1,"_nType":3},
        "1019":{"_id":1019,"_neighbors":[12,1018,1020],"_weight":1,"_nType":3},
        "1020":{"_id":1020,"_neighbors":[13,1019,1021],"_weight":1,"_nType":3},
        "1021":{"_id":1021,"_neighbors":[1020,1022],"_weight":1,"_nType":3},
        "1022":{"_id":1022,"_neighbors":[14,1021,1026,1046],"_weight":1,"_nType":3},
        "1023":{"_id":1023,"_neighbors":[31,45,1024,1029],"_weight":1,"_nType":3},
        "1024":{"_id":1024,"_neighbors":[32,46,1023,1025],"_weight":1,"_nType":3},
        "1025":{"_id":1025,"_neighbors":[33,47,1024,1026],"_weight":1,"_nType":3},
        "1026":{"_id":1026,"_neighbors":[34,48,1025,1022],"_weight":1,"_nType":3},
        "1027":{"_id":1027,"_neighbors":[1006,1015,1028],"_weight":1,"_nType":3},
        "1028":{"_id":1028,"_neighbors":[1027,1029],"_weight":2,"_nType":3},
        "1029":{"_id":1029,"_neighbors":[1014,1023,1028,1038],"_weight":1,"_nType":3},
        "1030":{"_id":1030,"_neighbors":[1009,1031],"_weight":1,"_nType":3},
        "1031":{"_id":1031,"_neighbors":[4,1030,1032],"_weight":1,"_nType":3},
        "1032":{"_id":1032,"_neighbors":[1031,1033,1047],"_weight":1,"_nType":3},
        "1033":{"_id":1033,"_neighbors":[40,53,1032,1034],"_weight":1,"_nType":3},
        "1034":{"_id":1034,"_neighbors":[41,55,1033,1035],"_weight":1,"_nType":3},
        "1035":{"_id":1035,"_neighbors":[42,56,1034,1036],"_weight":1,"_nType":3},
        "1036":{"_id":1036,"_neighbors":[43,57,1035,1037],"_weight":1,"_nType":3},
        "1037":{"_id":1037,"_neighbors":[44,58,1036,1039],"_weight":1,"_nType":3},
        "1038":{"_id":1038,"_neighbors":[1029,1039],"_weight":2,"_nType":3},
        "1039":{"_id":1039,"_neighbors":[1037,1038,1040,1055],"_weight":1,"_nType":3},
        "1040":{"_id":1040,"_neighbors":[49,63,1039,1041],"_weight":1,"_nType":3},
        "1041":{"_id":1041,"_neighbors":[50,64,1040,1042],"_weight":1,"_nType":3},
        "1042":{"_id":1042,"_neighbors":[51,65,1041,1043],"_weight":1,"_nType":3},
        "1043":{"_id":1043,"_neighbors":[52,66,1042,1044],"_weight":1,"_nType":3},
        "1044":{"_id":1044,"_neighbors":[1043,1045,1062],"_weight":1,"_nType":3},
        "1045":{"_id":1045,"_neighbors":[15,1044,1046],"_weight":1,"_nType":3},
        "1046":{"_id":1046,"_neighbors":[1022,1045],"_weight":1,"_nType":3},
        "1047":{"_id":1047,"_neighbors":[5,1032,1048],"_weight":1,"_nType":3},
        "1048":{"_id":1048,"_neighbors":[1047,1049],"_weight":1,"_nType":3},
        "1049":{"_id":1049,"_neighbors":[1048,1050,1064,2000],"_weight":1,"_nType":3},
        "1050":{"_id":1050,"_neighbors":[54,1049,1051],"_weight":1,"_nType":3},
        "1051":{"_id":1051,"_neighbors":[59,1050,1052],"_weight":1,"_nType":3},
        "1052":{"_id":1052,"_neighbors":[60,1051,1053],"_weight":1,"_nType":3},
        "1053":{"_id":1053,"_neighbors":[61,1052,1054,1069],"_weight":1,"_nType":3},
        "1054":{"_id":1054,"_neighbors":[62,1053,1056],"_weight":1,"_nType":3},
        "1055":{"_id":1055,"_neighbors":[1039,1056],"_weight":2,"_nType":3},
        "1056":{"_id":1056,"_neighbors":[1054,1055,1057],"_weight":1,"_nType":3},
        "1057":{"_id":1057,"_neighbors":[67,1056,1058],"_weight":1,"_nType":3},
        "1058":{"_id":1058,"_neighbors":[68,1057,1059],"_weight":1,"_nType":3},
        "1059":{"_id":1059,"_neighbors":[69,1058,1060],"_weight":1,"_nType":3},
        "1060":{"_id":1060,"_neighbors":[70,1059,1061],"_weight":1,"_nType":3},
        "1061":{"_id":1061,"_neighbors":[1060,1063],"_weight":1,"_nType":3},
        "1062":{"_id":1062,"_neighbors":[16,1044,1063],"_weight":1,"_nType":3},
        "1063":{"_id":1063,"_neighbors":[1061,1062],"_weight":1,"_nType":3},
        "1064":{"_id":1064,"_neighbors":[1049,1065],"_weight":2,"_nType":3},
        "1065":{"_id":1065,"_neighbors":[1064,1066],"_weight":1,"_nType":3},
        "1066":{"_id":1066,"_neighbors":[1065,1067],"_weight":1,"_nType":3},
        "1067":{"_id":1067,"_neighbors":[1066,1068,2002],"_weight":3,"_nType":3},
        "1068":{"_id":1068,"_neighbors":[1067,1074],"_weight":4,"_nType":3},
        "1069":{"_id":1069,"_neighbors":[1053,1070],"_weight":1,"_nType":3},
        "1070":{"_id":1070,"_neighbors":[1069,1071],"_weight":1,"_nType":3},
        "1071":{"_id":1071,"_neighbors":[1070,1072],"_weight":1,"_nType":3},
        "1072":{"_id":1072,"_neighbors":[1071,1073,2001],"_weight":1,"_nType":3},
        "1073":{"_id":1073,"_neighbors":[1072,1074],"_weight":1,"_nType":3},
        "1074":{"_id":1074,"_neighbors":[1068,1073],"_weight":1,"_nType":3},

        "2000":{"_id":2000,"_neighbors":[1049],"_weight":0,"_nType":4},
        "2001":{"_id":2001,"_neighbors":[1072],"_weight":0,"_nType":4},
        "2002":{"_id":2002,"_neighbors":[1067],"_weight":0,"_nType":4},

        "3000":{"_id":3000,"_neighbors":[],"_weight":0,"_nType":2}
    },
    "_nodeCount":148,
    "_edgeCount":153
}
);
        //});

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
