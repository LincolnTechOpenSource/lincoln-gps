/**
 * map.js
 * Matthew Vasseur
 * 06/02/16
 **/
(function() {
    'use strict';

    // array of department class names
    var DEPARTMENT_NAMES = [
        'account_setup', 'accounting', 'acd', 'asset_mgmt', 'branch_dev', 'branch_serv',
        'broom', 'busi_dev', 'compli_licens', 'conf', 'copy_scan_rm', 'doc_mgmt', 'elevator_exit',
        'euc', 'exec_suite', 'facilities', 'finance', 'food', 'hr', 'isd', 'im_r', 'isa',
        'mrkt_comm', 'one_time_financials', 'ops', 'prvd_mgmt', 'quality_cntrl',
        'reception', 'rdi', 'retire_serv', 'stairs_exit', 'tpa', 'vsa'
        //'break_area'
    ];

    angular
        .module('app.map', ['graph.service', 'location-info.directive', 'ion-search-select.directive'])
        .controller('Map', Map)
        .constant('DEPARTMENT_NAMES', DEPARTMENT_NAMES);

    Map.$inject = ['$rootScope', '$scope', '$stateParams', 'Locations', 'Firebase', 'DEPARTMENT_NAMES', 'Graphing'];
    function Map($rootScope, $scope, $stateParams, Locations, Firebase, DEPARTMENT_NAMES, Graphing) {
        var vm = this;

        vm.selectNode = {
            nodes: null, // only load if user is authenticated
            fromNode: null, // this will also serve as the parameter employee
            toNode: null,
            FIND_ON_MAP: "FIND_ON_MAP"
        };

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(function(user) {
            if (user) {
                Locations.load();
                Locations.all().then(function(data) {
                    vm.selectNode.nodes = data; // load locations
                });
            }
            else {
                Locations.unload();
                vm.selectNode.nodes = null;
            }
        });

        // handle employee parameter
        if (!!$stateParams.employee) {
            // set current employee and from node given parameter
            vm.selectNode.fromNode = $stateParams.employee;
        }

        // filter the map as prescribed
        for (var filter in $rootScope.filters) {
            if (!$rootScope.filters[filter].disp) {
                $('#svg #map .loc.' + filter).addClass('filter-out');
            }
        }

        // resets the path and removes all highlights (but leaves employee)
        vm.clear = function() {
            $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path

            // clear graphing parameters (keep source if employee is defined)
            vm.selectNode.toNode = null;
            vm.selectNode.fromNode = null;
        };

        /** resets the selected location and removes path highlighting
         * @locSelect will be either "fromNode" or "toNode" (e.g., a field of selectNode)
         */
        vm.clearLocation = function(locSelect) {
            // remove highlighting from path
            $("#svg #map g.non-walls .path").removeClass("hilite");
            if (vm.selectNode[locSelect] !== vm.selectNode.toNode ||
                vm.selectNode[locSelect] !== vm.selectNode.fromNode) {
                $('#svg #map #' + vm.selectNode[locSelect].id).removeClass('hilite');
            }
            vm.selectNode[locSelect] = null; // clear the location
        };

        // watch to find directions
        $scope.$watch("selectNode.toNode", function(newNode, oldNode) {
            // select on map option
            if (newNode === vm.selectNode.FIND_ON_MAP) {
                vm.selectNode.toNode = null; // clear value
                $('#svg #map #outer-border').addClass('select-me');
                $('#svg #map').attr('select-on-click', 'toNode');
            }
            // find directions
            else {
                findDirections();
                // also change highlight from old node to new node
                if (!!newNode)
                    $('#svg #map #' + newNode.id).addClass('hilite');
            }
            if (!!oldNode && (vm.selectNode.fromNode !== oldNode) && (newNode !== oldNode)) {
                $('#svg #map #' + oldNode.id).removeClass('hilite');
            }

        });
        $scope.$watch("selectNode.fromNode", function(newNode, oldNode) {
            // select on map option
            if (newNode === vm.selectNode.FIND_ON_MAP) {
                vm.selectNode.fromNode = null; // clear value
                $('#svg #map #outer-border').addClass('select-me');
                $('#svg #map').attr('select-on-click', 'fromNode');
            }
            // find directions
            else {
                findDirections();
                // also change highlight from old node to new node
                if (!!newNode) {
                    $('#svg #map #' + newNode.id).addClass('hilite');
                }
            }
            if (!!oldNode && (vm.selectNode.toNode !== oldNode) && (newNode !== oldNode)) {
                $('#svg #map #' + oldNode.id).removeClass('hilite');
            }
        });

        var findDirections = function() {
            if (!!vm.selectNode.fromNode && !!vm.selectNode.toNode) {
                var dirResults = Dijkstra.run(vm.selectNode.fromNode.$id,
                    vm.selectNode.toNode.$id, Graphing.graph);

                //console.assert(false, dirResults);

                var directions = Dijkstra.getPath(dirResults.prev, vm.selectNode.toNode.$id);

                //console.log(directions);

                $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path
                for (var i = 0; i < directions.length; i++) {
                    $('#svg #map #' + directions[i]).addClass('hilite'); // hilite each block in the path
                }
            }
        };

        var checkSelect = function(event) {
            var selectOnClick = $('#svg #map').attr('select-on-click');
            if (selectOnClick != 'false') {
                Locations.get(this.id).then(function(loc) {
                    vm.selectNode[selectOnClick] = loc;
                });

                $('#svg #map #outer-border').removeClass('select-me');
                $('#svg #map').attr('select-on-click', 'false');
            }
        };

        $(document).ready(function() {
            $('#svg').on('click', '#map .non-walls .desk', checkSelect);
            // debugging to get neighbors
            // $('#svg').on('click', '#map .loc', function() { console.log(this.id); });

            // debugging to highlight neighbors
            // $('#svg').on('click', '#map .loc', function() {
            //     var n = Graphing.graph.nodes[this.id];
            //     $("#svg #map .loc").removeClass("hilite"); // clear old path
            //     for (var i = 0; i < n._neighbors.length; i++) {
            //         $("#" + n._neighbors[i]).addClass("hilite");
            //     }
            // });

            for (var i = 0; i < DEPARTMENT_NAMES.length; i++) {
                $(".dep_list ." + DEPARTMENT_NAMES[i]).hover(
                    // attach hover element to each legend component so that hovering over text
                    // makes all corresponding locations highlight
                    batchToggleClass([".loc." + DEPARTMENT_NAMES[i] + ", " +
                        ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_colorbox",
                        ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_text"
                    ], ["hilite", "normal-text"]));

                // attach hover element to each loc component so that hovering over location
                // makes the corresponding legend item highlight
                $(".loc." + DEPARTMENT_NAMES[i]).hover(
                    batchToggleClass([".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_colorbox",
                        ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_text"
                    ], ["hilite", "normal-text"]));
            }
        });
    }

    /** batchToggleClass: toggles the @classes of the specified @selectors
     * toggles the corresponding class of an array of selectors */
    var batchToggleClass = function(selectors, classes) {
        return function() {
            console.assert(selectors.length == classes.length, 'Invalid Call to batchToggleClass');
            for (var i = 0; i < selectors.length; i++) {
                $(selectors[i]).toggleClass(classes[i]);
            }
        };
    };
})();