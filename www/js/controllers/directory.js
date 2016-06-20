/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.directory', ['ion-search-select.directive'])
        .controller('Directory', Directory);

    Directory.$inject = ['$state', 'Locations', 'Firebase'];

    function Directory($state, Locations, Firebase) {
        var vm = this;

        vm.selectEmployee = {
            employees: null, // only load if user is authenticated
            employee: null
        };

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(function(user) {
            if (user) {
                Locations.load();
                vm.selectEmployee.employees = Locations.getByNType(NodeTypeEnum.DESK);
            }
            else {
                Locations.unload();
                vm.selectEmployee.employees = null;
            }
        });
    }
})();


/*$scope.go = function(state, params) {
    //ui-sref="tab.map({employee: selectEmployee.employee})"
    //console.log(state);

    $ionicHistory.clearCache().then(function() {
        $ionicHistory.clearHistory();
        console.log($ionicHistory.viewHistory());
        $state.go(state, params);
    });

};*/