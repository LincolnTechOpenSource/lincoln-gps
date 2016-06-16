/* account.controller.js */

var accountCtrl = angular.module('account.controller', []);

accountCtrl.controller('AccountCtrl', ['$scope', '$rootScope', 'DEPARTMENT_NAMES',
  function($scope, $rootScope, DEPARTMENT_NAMES) {

    $scope.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };

  }
]);