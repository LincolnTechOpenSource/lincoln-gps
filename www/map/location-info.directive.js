// location-info.directive.js

angular.module('location-info.directive', [])
    .directive('locationInfo', [function() {
        return {
            restrict: 'E',
            scope: {
                locSelect: '@',
                location: '='
            },
            transclude: true,
            templateUrl: 'templates/location-info.html'
        };
    }]);