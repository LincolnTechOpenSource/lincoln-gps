// location-info.directive.js

angular.module('location-info.directive', [])
    .directive('locationInfo', [function() {
        return {
            restrict: 'E',
            scope: {
                location: '='
            },
            templateUrl: 'templates/location-info.html'
        };
    }]);