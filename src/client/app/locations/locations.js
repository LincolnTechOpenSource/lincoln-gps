// location.js
(function() {
    'use strict';

    angular.module('app.loc')
        .factory('Locations', Locations);

    // handle locations table queries
    /* @ngInject */
    function Locations($q, $http, $filter, $log) {
        var primePromise;
        var URL = 'data/locations.json';

        var service = {
            locations: null,

            all: all,
            allArray: allArray,
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

        /** allArray: returns all the locations in array format */
        function allArray() {
            return $.map(service.locations, function(el) { return el; });
        }


        /** getByNType: returns all the locations of nType @nType */
        function getByNType(nType) {
            return $filter('filter')(allArray(), {nType: nType}, true);
        }

        /** get: returns the location information specified by @locID
         * can assume that service.locations is not null */
        function get(locID) {
            locID = ('00'+locID).slice(-3); // 0 pad number (we know range is 1..100s)
            return service.locations['loc' + locID];
        }

        function prime() {
            // This function should only be called once; hence prime.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $http.get(URL).then(success);
            return primePromise;

            function success(response) {
                service.locations = response.data;
                // $log.info('Primed Locations Data');
                return service.locations;
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