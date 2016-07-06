// localStorage.js
(function() {
    'use strict';

    angular.module('app.core')
        .factory('localStorage', localStorage);

    /* @ngInject */
    function localStorage($window, $http) {
        var service = {
            set: set,
            get: get,
            destroy: destroy
        };

        return service;

        //------------------------------------

        function set(key, value) {
            return $window.localStorage.setItem(key, JSON.stringify(value));
        }

        function get(key) {
            return JSON.parse($window.localStorage.getItem(key));
        }

        function destroy(key) {
            return $window.localStorage.removeItem(key);
        }
    }
})();