/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.directory')
        .controller('DirectoryCtrl', DirectoryCtrl)
        .filter('byDepartment', byDepartment);

    /* @ngInject */
    function DirectoryCtrl($scope, $state, $log, Locations, Firebase,
        Params, NodeTypeEnum, UNITS) {
        var vm = this;

        vm.selectEmployee = {
            employees: null, // only load if user is authenticated
            employee: null
        };
        vm.filters = {
            d: UNITS.DEPARTMENTS,
            count: 0,
            show: false,

            counter: function(checked) {
                return checked ? vm.filters.count++ : vm.filters.count--;
            }
        };
        // filter accordion toggle
        vm.toggleFilters = toggleFilters;

        // click to clear selected employee
        vm.clearEmployee = clearEmployee;

        // set employee parameter and link to map
        vm.findOnMap = findOnMap;

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(userAuth);

        // activate the controller on view enter
        $scope.$on('$ionicView.enter', activate);

        //------------------------------------------------//

        /** handle filter accordion toggle and show */
        function toggleFilters() {
            vm.filters.show = !vm.filters.show;
        }

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

        /** resets the selected employee */
        function clearEmployee() {
            vm.selectEmployee.employee = null;
        }
    }

    /* @ngInject */
    function byDepartment($filter) {

        /** filter the specified @options by the @filters */
        return function(options, filters) {
            // return everything if there are no filters (QoL feature)
            // if (filters.count <= 0) {
            //     return options;
            // }

            // get the departments to show (we know depFilters is not empty because count > 0)
            var depFilters = $filter('filter')(filters, { dirShow: true }, true);

            if (depFilters.length <= 0) {
                return options;
            }

            return filterOptions();

            //-----------------------------------------

            /** filter the options by department that should be shown */
            function filterOptions() {
                return options.filter(function(option) {
                    // determines whether this particularly option matches any filter
                    var ret = depFilters.filter(function(depFilter) {
                        return depFilter.code === option.depCode; // match ?
                    });
                    return (ret.length > 0) ? ret : false; // return results if not empty
                });
            }
        };
    }
})();