/* account.controller.js */
(function() {
  'use strict';

  angular
    .module('app.account', [])
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$rootScope'];
  function AccountCtrl($rootScope) {
    var vm = this;

    vm.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };
  }
})();