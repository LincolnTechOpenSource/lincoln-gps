// divisionFilter.js
(function() {
    'use strict';

    angular.module('app.loc')
        .filter('division', division);

    /** displays the division name for a given divCode */
    /* @ngInject */
    function division($filter, UNITS) {
        return function(depCode) {
            var division = $filter('filter')(UNITS.ALL, {
                depCode: depCode
            }, true)[0];

            return division ? division.name : 'ERROR';
        };
    }
})();
