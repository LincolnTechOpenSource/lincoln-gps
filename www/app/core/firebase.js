// firebase.js
(function() {
    'use strict';

    angular.module('app.core')
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

        /** get: returns the location information specified by @locID
         * can assume that service.locations is not null */
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
                // $log.info('Primed Locations Data');
            }
        }

        /** load: sets the locations firebase table then runs next promises */
        function load(nextPromises) {
            var loadPromise = primePromise || prime();

            return loadPromise
                .then(function() {  return $q.all(nextPromises); })
                .catch(function() { $log.error(loadPromise); });

        }

        /** unload: nulls the locations firebase table */
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
    Users.$inject = ['$q', '$firebaseObject', '$log'];
    function Users($q, $firebaseObject, $log) {
        var primePromise;
        const DB = firebase.database().ref('users');

        var service = {
            users: null,

            all: all,
            get: get,
            set: set,
            bind: bind,
            load: load,
            unload: unload,
            loaded: loaded
        };

        return service;

        //------------------------------------------------//

        /** all: returns all users (can assume that service.users is not null) */
        function all() {
            return service.users;
        }

        /** get: returns the user specified by @uid
         * can assume that service.users is not null */
        function get(uid) {
            return service.users[uid];
        }

        /** set: sets the user @uid's @key to @value
         * can assume that service.users is not null */
        function set(uid, key, value) {
            service.users[uid][key] = value;
            service.users.$save();
        }

        /** bind: binds the @scope and @varName to the specified @uid
         * can assume that service.users is not null */
        function bind(scope, varName, uid) {
            service.users[uid].$bindTo(scope, varName);
        }

        function prime() {
            // This function can only be called once
            if (primePromise) {
                return primePromise;
            }

            service.users = $firebaseObject(DB);
            primePromise = service.users.$loaded().then(success);
            return primePromise;

            function success(data) {
                // $log.info('Primed Users Data');
            }
        }

        /** load: sets the users firebase table then runs next promises */
        function load(nextPromises) {
            var loadPromise = primePromise || prime();

            return loadPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(function() { $log.error(loadPromise); });
        }

        /** unload: nulls the users firebase table */
        function unload() {
            service.users = null;
            primePromise = null;
        }

        /** loaded: returns true if users is laoded, false otherwise */
        function loaded() {
            return !!service.users;
        }
    }

    // General Firebase services
    Firebase.$inject = ['$firebaseAuth', 'CONFIG'];
    function Firebase($firebaseAuth, CONFIG) {
        var isInit = false;

        var service = {
            init: init,
            auth: auth
        };

        return service;

        //------------------------------------------------//

        function init() {
            // Initialize Firebase with credentials
            if (!isInit) {
                firebase.initializeApp(CONFIG);
                isInit = true;
            }
        }

        function auth() {
            // handle firebase authenticator
            return $firebaseAuth();
        }
    }
})();