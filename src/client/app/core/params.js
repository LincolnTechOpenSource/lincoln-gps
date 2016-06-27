// params.js
(function() {
    'use strict';

    angular.module('app.core')
        .factory('Params', Params);

    // handle parameters across controllers
    Params.$inject = [];
    function Params() {
        var service = {
            employee: null // employee parameter for directory to map
        };

        return service;

        //------------------------------------------------//
    }
})();