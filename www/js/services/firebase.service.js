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
    Locations.$inject = ['$q', '$firebaseArray', '$log'];
    function Locations($q, $firebaseArray, $log) {
        var primePromise;
        const DB = firebase.database().ref('locations');

        var service = {
            locations: null,

            all: all,
            get: get,
            getByNType: getByNType,
            load: load,
            unload: unload,
            loaded: loaded
        };

        return service;

        //------------------------------------------------//

        /** all: returns all the locations
         * can assume that service.locations is not null */
        function all() {
            return service.locations;
        }

        /** getByNType: returns all the locations of nType @nType */
        function getByNType(nType) {
            return $firebaseArray(DB.orderByChild("nType").equalTo(nType));
        }

        /** get: returns the location information specified by @locID via a promise */
        function get(locID) {
            return service.locations.$getRecord(locID);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            service.locations = $firebaseArray(DB);
            primePromise = service.locations.$loaded().then(success);
            return primePromise;

            function success(data) {
                $log.info('Primed Locations Data');
            }
        }

        /** load: sets the users firebase table then runs next promises */
        function load(nextPromises) {
            var loadPromise = primePromise || prime();

            return loadPromise
                .then(function() {  return $q.all(nextPromises); })
                .catch(function() { $log.error(loadPromise); });

        }

        /** unload: nulls the users firebase table */
        function unload() {
            service.locations = null;
            primePromise = null;
        }

        /** loaded: returns true if locations is loaded, false otherwise */
        function loaded() {
            return !!service.locations;
        }
    }

    // handle users table queries
    Users.$inject = ['$firebaseArray'];
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