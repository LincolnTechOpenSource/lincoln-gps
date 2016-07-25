// locationInfo.js

angular
    .module('app.loc')
    .directive('locationInfo', locationInfo);

/* @ngInject */
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
        templateUrl: 'app/locations/locationInfo.html',
        controller: ['$scope', 'NODE_TYPES', function($scope, NODE_TYPES) {
            $scope.EMPL = NODE_TYPES.EMPL;
        }]
    };
}
