/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.directory')
        .controller('DirectoryCtrl', DirectoryCtrl);

    // DirectoryCtrl.$inject = ['$scope', '$state', '$log', 'Locations', 'Firebase',
    //     'Params', 'NodeTypeEnum', 'DEPARTMENTS'];
    /* @ngInject */
    function DirectoryCtrl($scope, $state, $log, Locations, Firebase,
        Params, NodeTypeEnum, DEPARTMENTS) {
        var vm = this;

        vm.selectEmployee = {
            employees: null, // only load if user is authenticated
            employee: null
        };
        vm.filters = {
            d: DEPARTMENTS,
            count: 0,

            counter: function(checked) {
                return checked ? vm.filters.count++ : vm.filters.count--;
            }
        };
        // vm.filters = DEPARTMENTS;

        // set employee parameter and link to map
        vm.findOnMap = findOnMap;

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(userAuth);

        // activate the controller on view enter
        $scope.$on('$ionicView.enter', activate);

        //------------------------------------------------//

        /** run upon controller activate */
        function activate() {
            // $log.info('Activated Directory View');
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