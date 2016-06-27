// location.js
(function() {
    'use strict';

    angular.module('app.core')
        .factory('Locations', Locations);

    // handle locations table queries
    Locations.$inject = ['$q', '$firebaseArray', '$log'];
    function Locations($q, $firebaseArray, $log) {
        var primePromise;
        /* global firebase */
        var DB = firebase.database().ref('locations'); // constant

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
            return $firebaseArray(DB.orderByChild('nType').equalTo(nType));
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
})();