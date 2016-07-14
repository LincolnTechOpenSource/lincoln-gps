/**
 * directory.js
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.directory')
        .controller('DirectoryCtrl', DirectoryCtrl)
        .filter('byField', byField);

    /* @ngInject */
    function DirectoryCtrl($scope, $state, $log, $q, Locations, Firebase,
        Params, NODE_TYPES, UNITS, TITLES) {
        var vm = this;

        vm.selectEmployee = {
            employees: null, // only load if user is authenticated
            employee: null
        };

        vm.filters = {
            d: UNITS.DEPARTMENTS, // department filters
            t: TITLES, // title filter
            show: {
                d: false, // accordion show department filters
                t: false, // accordion show title filters
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
        // $scope.$on('$ionicView.enter', activate);

        //------------------------------------------------//

        /** handle filter accordion toggle and show */
        function toggleFilters(key) {
            vm.filters.show[key] = !vm.filters.show[key];
        }

        /** run upon controller activate */
        // function activate() {
        //     // $log.info('Activated Directory View');
        //     return true;
        // }

        /** handle user authentication */
        function userAuth(user) {
            if (user) {
                // vm.selectEmployee.employees = Locations.getByNType(NODE_TYPES.DESK);
                var promises = [ getByNType() ];

                return $q.all(promises).then();
            }
            else {
                Locations.unload();
                vm.selectEmployee.employees = null;
            }
        }

        /** load the Locations table as an array */
        function getByNType() {
            return $q.when(Locations.getByNType(NODE_TYPES.DESK)).then(function(data) {
                vm.selectEmployee.employees = data;
                $log.info('Employees Loaded');
                return vm.selectEmployee.employees;
            });
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
    function byField($filter) {
        /** filter the specified @options across the @filtersList by @filterCode
         * e.g. across department filters by depCode */
        return function(options, filtersList, filterCode) {
            // get the filters to use (i.e., those that are active)
            var activeFilters = $filter('filter')(filtersList, { show: true }, true);

            // return everything if there are no filters (QoL feature)
            if (activeFilters.length <= 0) {
                return options;
            }

            return filterOptions(activeFilters, filterCode);

            //-----------------------------------------

            /** filter the options according to the active filters that should be shown */
            function filterOptions(activeFilters, filterCode) {
                return options.filter(function(option) {
                    // determines whether this particularly option matches any filter
                    var ret = activeFilters.filter(function(filter) {
                        return filter[filterCode] === option[filterCode]; // match ?
                    });
                    return (ret.length > 0) ? ret : false; // return results if not empty
                });
            }
        };
    }
})();