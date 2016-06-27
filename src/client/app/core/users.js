// firebase.js
(function() {
    'use strict';

    angular.module('app.core')
        .factory('Users', Users);

    // handle users table queries
    Users.$inject = ['$q', '$firebaseObject', '$log'];
    function Users($q, $firebaseObject, $log) {
        var primePromise;
        /* global firebase */
        var DB = firebase.database().ref('users'); // constant

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

        /** set: sets the user @uid's @keys (should be an array) to @value
         * can assume that service.users is not null */
        function set(uid, keys, value) {
            var i = 0,
                obj = service.users[uid],
                len = keys.length - 1;

            for (; i < len; i++) {
                obj = obj[keys[i]];
            }

            obj[keys[i]] = value;

            // service.users[uid][key] = value;
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
})();