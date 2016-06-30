// locationInfo.js

angular
    .module('app.map')
    .directive('locationInfo', locationInfo)
    .filter('division', division);

function locationInfo() {
    return {
        restrict: 'E',
        scope: {
            locSelect: '@',
            location: '='
        },
        transclude: true,
        templateUrl: 'app/map/locationInfo.html'
    };
}

/* @ngInject */
function division($filter, DEPARTMENTS) {
    return function(divCode) {
        var division = $filter('filter')(DEPARTMENTS, {
            code: divCode
        }, true)[0];

        return division ? division.name : 'ERROR';
    };
}