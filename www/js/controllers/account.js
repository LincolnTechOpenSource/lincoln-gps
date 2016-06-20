/* account.js */
(function() {
  'use strict';

  angular
    .module('app.account', [])
    .controller('Account', Account);

  Account.$inject = ['$rootScope'];
  function Account($rootScope) {
    var vm = this;

    vm.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };
  }
})();