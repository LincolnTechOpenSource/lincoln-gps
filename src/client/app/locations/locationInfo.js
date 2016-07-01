// locationInfo.js

angular
    .module('app.loc')
    .directive('locationInfo', locationInfo);

function locationInfo() {
    return {
        restrict: 'E',
        scope: {
            location: '='
        },
        transclude: {
            'above': '?above',
            'below': '?below'
        },
        templateUrl: 'app/locations/locationInfo.html'
    };
}
