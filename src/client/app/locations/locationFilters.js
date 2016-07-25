// locationFilter.js
(function() {
    'use strict';

    angular.module('app.loc')
        .filter('division', division)
        .filter('title', title);

    /** displays the division name for a given divCode */
    /* @ngInject */
    function division($filter, DEPARTMENTS) {
        return function(depCode) {
            return filterHelper($filter, DEPARTMENTS.ALL, {'depCode': depCode});
        };
    }

    /** displays the division name for a given divCode */
    /* @ngInject */
    function title($filter, TITLES) {
        return function(titleCode) {
            return filterHelper($filter, TITLES, {'titleCode': titleCode});
        };
    }

    /** helper function for filters */
    function filterHelper($filter, array, comparator) {
        var ret = $filter('filter')(array, comparator, true)[0];

        return ret ? ret.name : 'ERROR';
    }
})();
