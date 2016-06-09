/* account.controller.js */

angular.module('account.controller', [])
    .controller('AccountCtrl', function($scope, $rootScope) {

        $scope.resetToDefault = function() {
            for (var filter in $rootScope.filters) {
                $rootScope.filters[filter].disp = true;
            }
        };
    });