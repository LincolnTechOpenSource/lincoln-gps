// locationInfo.js

angular
    .module('app.core')
    .directive('locationInfo', locationInfo);

function locationInfo() {
    return {
        restrict: 'E',
        scope: {
            // locSelect: '@',
            location: '='
        },
        transclude: {
            'above': '?above',
            'below': '?below'
        },
        templateUrl: 'app/core/locationInfo.html'
    };
}
