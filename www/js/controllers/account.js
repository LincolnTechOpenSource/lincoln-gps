/* account.js */
(function() {
  'use strict';

  angular
    .module('app.account', [])
    .controller('Account', Account);

  Account.$inject = ['$rootScope', '$scope', '$log'];
  function Account($rootScope, $scope, $log) {
    var vm = this;

    vm.resetToDefault = resetToDefault;

    // activate the controller on view enter
    $scope.$on('$ionicView.enter', activate);

    //------------------------------------------------//

    /** controller if active */
    function activate() {
      $log.info('Activated Directory View');
      return true;
    }

    function resetToDefault() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    }
  }
})();