// divisionFilter.js
(function() {
    'use strict';

    angular.module('app.core')
        .filter('division', division);

    /* @ngInject */
    function division($filter, DEPARTMENTS) {
        return function(divCode) {
            var division = $filter('filter')(DEPARTMENTS, {
                code: divCode
            }, true)[0];

            return division ? division.name : 'ERROR';
        };
    }
})();
