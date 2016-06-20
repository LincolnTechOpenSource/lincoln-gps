// firebase.service.js

(function() {
    'use strict';

    angular.module('firebase.service', ['firebase'])
        .constant('CONFIG', {
            apiKey: "AIzaSyBJmytcwYLNjfjPp4beCPewJ6XKE7mRYJs",
            authDomain: "lincoln-gps.firebaseapp.com",
            databaseURL: "https://lincoln-gps.firebaseio.com",
            storageBucket: "lincoln-gps.appspot.com",
        })
        .factory('Locations', Locations)
        .factory('Users', Users)
        .factory('Firebase', Firebase);

    // handle locations table queries
    Locations.$inject = ['$firebaseArray'];
    function Locations($firebaseArray) {
        var service = {
            locations: null,

            load: load,
            unload: unload,
            all: all,
            get: get,
            getByNType: getByNType
        };

        return service;

        //------------------------------------------------//

        /** load: sets the users firebase table */
        function load() {
            var db = firebase.database().ref('locations');
            service.locations = $firebaseArray(db);
        }
        /** unload: nulls the users firebase table */
        function unload() {
            service.locations = null;
        }
        /** all: returns all the locations */
        function all() {
            return service.locations.$loaded(function(locations) {
                return locations;
            });
        }
        /** getByNType: returns all the locations of nType @nType */
        function getByNType(nType) {
            if (!!service.locations) {
                var db = firebase.database().ref('locations');
                return $firebaseArray(db.orderByChild("nType").equalTo(nType));
            }
            else {
                return null;
            }
        }

        /** get: returns the location information specified by @locID via a promise */
        function get(locID) {
            return service.locations.$loaded(function(locations) {
                return locations.$getRecord(locID);
            });
        }
    }

    // handle users table queries
    Users.inject = ['$firebaseArray'];
    function Users($firebaseArray) {
        var service = {
            users: null,

            load: load,
            unload: unload,
            get: get,
            set: set
        };

        return service;

        //------------------------------------------------//


        /** load: sets the users firebase table */
        function load() {
            var db = firebase.database().ref('users');
            service.users = $firebaseArray(db);
        }
        /** unload: nulls the users firebase table */
        function unload() {
            service.users = null;
        }

        /** get: returns the user specified by @uid via a promise */
        function get(uid) {
            return service.users.$loaded(function(users) {
                return users.$getRecord(uid);
            });
        }

        /** set: sets the user @uid's @key to @value */
        function set(uid, key, value) {
            service.users.$loaded(function(users) {
                var index = users.$indexFor(uid);
                users[index][key] = value;
                users.$save(index);
            });
        }
    }

    // General Firebase services
    Firebase.$inject = ['$firebaseAuth', 'CONFIG'];

    function Firebase($firebaseAuth, CONFIG) {
        var service = {
            init: init,
            auth: auth
        };

        return service;

        //------------------------------------------------//

        function init() {
            // Initialize Firebase with credentials
            firebase.initializeApp(CONFIG);
        }

        function auth() {
            // handle firebase authenticator
            return $firebaseAuth();
        }
    }
})();