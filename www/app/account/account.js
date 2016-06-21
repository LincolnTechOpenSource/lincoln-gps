/* account.js */
(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$rootScope', '$scope', '$log'];
  function AccountCtrl($rootScope, $scope, $log) {
    var vm = this;

    vm.resetToDefault = resetToDefault;

    // activate the controller on view enter
    $scope.$on('$ionicView.enter', activate);

    //------------------------------------------------//

    /** run upon controller activate */
    function activate() {
      $log.info('Activated Account View');
      return true;
    }

    function resetToDefault() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    }
  }
})();