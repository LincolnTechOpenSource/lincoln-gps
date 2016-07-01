// divisionFilter.js
(function() {
    'use strict';

    angular.module('app.loc')
        .filter('division', division);

    /* @ngInject */
    function division($filter, UNITS) {
        return function(divCode) {
            var division = $filter('filter')(UNITS.DEPARTMENTS, {
                code: divCode
            }, true)[0];

            return division ? division.name : 'ERROR';
        };
    }
})();
