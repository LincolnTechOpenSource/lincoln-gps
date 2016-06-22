/* account.js */
(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$rootScope', '$scope', '$log', 'Users'];
  function AccountCtrl($rootScope, $scope, $log, Users) {
    var vm = this;

    vm.resetToDefault = resetToDefault;

    // activate the controller on view enter
    $scope.$on('$ionicView.enter', activate);

    // terminate the controller on view exit
    $scope.$on('$ionicView.leave', terminate);

    //------------------------------------------------//

    /** run upon controller activate */
    function activate() {
      // $log.info('Activated Account View');
      return true;
    }

    /** run upon controller terminate */
    function terminate() {
      for (var filter in $rootScope.user.filters) {
        Users.set($rootScope.user.id, ['filters', filter, 'disp'], $rootScope.user.filters[filter].disp);
      }
    }

    /** rest all filters to true */
    function resetToDefault() {
      for (var filter in $rootScope.user.filters) {
        $rootScope.user.filters[filter].disp = true;
        // Users.set($rootScope.user.id, ['filters', filter, 'disp'], true);
      }
    }
  }
})();