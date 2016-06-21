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

    Directory.$inject = ['$scope', '$state', '$log', 'Locations', 'Firebase', 'Params'];
    function Directory($scope, $state, $log, Locations, Firebase, Params) {
        var vm = this;

        vm.selectEmployee = {
            employees: null, // only load if user is authenticated
            employee: null
        };

        // set employee parameter and link to map
        vm.findOnMap = findOnMap;

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(userAuth);

        // activate the controller on view enter
        $scope.$on('$ionicView.enter', activate);

        //------------------------------------------------//

        /** controller if active */
        function activate() {
            $log.info('Activated Directory View');
            return true;
        }

        /** handle user authentication */
        function userAuth(user) {
            if (user) {
                vm.selectEmployee.employees = Locations.getByNType(NodeTypeEnum.DESK);
            }
            else {
                vm.selectEmployee.employees = null;
            }
        }

        /** click function to find @employee on map tab */
        function findOnMap(employee) {
            Params.employee = employee;
            $state.go('tab.map');
        }
    }
})();