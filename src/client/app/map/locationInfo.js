// locationInfo.js

angular
    .module('app.map')
    .directive('locationInfo', locationInfo);

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

