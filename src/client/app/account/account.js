/* account.js */
(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('AccountCtrl', AccountCtrl);

  /* @ngInject */
  function AccountCtrl($rootScope, $scope, $log, Users, $localStorage) {
    var vm = this;

    vm.filters = $localStorage.prefs.filters;
    vm.showMapPopup = $localStorage.prefs.showMapPopup;

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
      /* remnants of firebase */
      // save filter preferences
      // var filters = localStorage.get('filters');
      // for (var filter in filters) {
      //   if (filters.hasOwnProperty(filter)) {
      //     // Users.set($rootScope.user.id, ['filters', filter, 'disp'], $rootScope.user.filters[filter].disp);
      //     // localStorage.set('filters', filters[filte])
      //   }
      // }

      // save popup preference
      // Users.set($rootScope.user.id, ['showMapPopup'], $rootScope.user.showMapPopup);

      // save filter and map popup preferences in local storage
      // localStorage.set('filters', $rootScope.prefs.filters);
      // localStorage.set('showMapPopup', $rootScope.prefs.showMapPopup);
    }

    /** rest all preferences to true */
    function resetToDefault() {
      // reset filters
      // for (var filter in $rootScope.prefs.filters) {
      //   if ($rootScope.prefs.filters.hasOwnProperty(filter)) {
      //     $rootScope.prefs.filters[filter].disp = true;
      //   }
      // }
      // // reset map popup
      // $rootScope.prefs.showMapPopup = true;
    }
  }
})();