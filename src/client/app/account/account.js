/* account.js */
(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('AccountCtrl', AccountCtrl);

  /* @ngInject */
  function AccountCtrl($scope, $log, $localStorage, FILTERS) {
    var vm = this;

    vm.prefs = $localStorage.prefs;

    vm.resetToDefault = resetToDefault;

    // activate the controller on view enter
    // $scope.$on('$ionicView.enter', activate);


    //------------------------------------------------//

    /** run upon controller activate */
    // function activate() {
    //   // $log.info('Activated Account View');
    //   return true;
    // }

    /** rest all preferences to true */
    function resetToDefault() {
      // reset preferences (filters & map popup)
      vm.prefs.filters = FILTERS;
      vm.prefs.showMapPopup = true;
    }
  }
})();