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
        .module('app.map')
        .constant('DEPARTMENT_NAMES', DEPARTMENT_NAMES)
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$rootScope', '$scope', '$log', '$q', 'Users',
        'Locations', 'Firebase', 'DEPARTMENT_NAMES', 'Graphing', 'Params', 'Dijkstra'
    ];
    function MapCtrl($rootScope, $scope, $log, $q, Users, Locations,
        Firebase, DEPARTMENT_NAMES, Graphing, Params, Dijkstra) {
        var vm = this;

        vm.selectNode = {
            nodes: null, // only load if user is authenticated
            fromNode: null, // this will also serve as the parameter employee
            toNode: null,
            FIND_ON_MAP: "FIND_ON_MAP"
        };
        // vm.clear = clear;
        vm.clearLocation = clearLocation;

        $scope.$watch("vm.selectNode.toNode", watchNode.bind(null,'toNode'));
        $scope.$watch("vm.selectNode.fromNode", watchNode.bind(null, 'fromNode'));

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(userAuth);

        // ready document specific commands
        $(document).ready(documentReady);

        // activate the controller on view enter
        $scope.$on('$ionicView.enter', activate);

        // initialize & create graph
        // Graphing.debug = true; // debug for testing purposes
        Graphing.createGraph();

        //------------------------------------------------//

        /** run upon controller activate */
        function activate() {
            // handle employee parameter
            if (!!Params.employee) {
                // set current employee and from node given parameter
                vm.selectNode.fromNode = Params.employee;
                Params.employee = null; // null out parameter after 'use'
            }

            // filter the map as prescribed
            Users.load().then(usersLoad);

            // $log.info('Activated Map View');
            return true;
        }

        /** functions for after users have loaded */
        function usersLoad() {
            var user = $rootScope.user || Users.get(Firebase.auth().$getAuth().uid);
            $("#svg #map .loc").removeClass("filter-out"); // remove old filter
            for (var filter in user.filters) {
                if (!user.filters[filter].disp) {
                    $('#svg #map .loc.' + filter).addClass('filter-out');
                }
            }
        }

        /** handle user authentication */
        function userAuth(user) {
            if (user) {
                load();
            }
            else {
                Locations.unload();
                vm.selectNode.nodes = null;
            }
        }

        /** load the Locations table */
        function load() {
            if (Locations.loaded()) {
                return vm.selectNode.nodes = Locations.all();
            }
            else {
                var promises = [all()];
                return Locations.load(promises).then();
            }
        }
        function all() {
            return $q.when(Locations.all()).then(function() {
                vm.selectNode.nodes = Locations.all();
                $log.info('Locations Loaded');
                return vm.selectNode.nodes;
            });
        }

        /** resets the path and removes all highlights (but leaves employee) */
        // function clear() {
        //     $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path

        //     // clear graphing parameters
        //     vm.selectNode.toNode = null;
        //     vm.selectNode.fromNode = null;
        // }

        /** resets the selected location and removes path highlighting
         * @locSelect will be either "fromNode" or "toNode" (e.g., a field of selectNode)
         */
        function clearLocation(locSelect) {
            // remove highlighting from path
            $("#svg #map g.non-walls .path").removeClass("hilite");
            if (vm.selectNode[locSelect] !== vm.selectNode.toNode ||
                vm.selectNode[locSelect] !== vm.selectNode.fromNode) {
                $('#svg #map #' + vm.selectNode[locSelect].id).removeClass('hilite');
            }
            vm.selectNode[locSelect] = null; // clear the location
        }

        /** watch a @node (to or from) for changes and handle them (via mapping) */
        function watchNode(node, newNode, oldNode) {
            // select on map option
            if (newNode === vm.selectNode.FIND_ON_MAP) {
                vm.selectNode[node] = null; // clear value
                $('#svg #map #outer-border').addClass('select-me');
                $('#svg #map').attr('select-on-click', node);
            }
            // find directions
            else {
                findDirections();
                // also change highlight from old node to new node
                if (!!newNode)
                    $('#svg #map #' + newNode.id).addClass('hilite');
            }
            if (!!oldNode && (vm.selectNode[node] !== oldNode) && (newNode !== oldNode)) {
                $('#svg #map #' + oldNode.id).removeClass('hilite');
            }
        }

        function findDirections() {
            if (!!vm.selectNode.fromNode && !!vm.selectNode.toNode) {
                var dirResults = Dijkstra.run(vm.selectNode.fromNode.$id,
                    vm.selectNode.toNode.$id, Graphing.graph);

                var directions = Dijkstra.getPath(dirResults.prev, vm.selectNode.toNode.$id);

                $("#svg #map .loc").removeClass("hilite"); // clear old path
                for (var i = 0; i < directions.length; i++) {
                    $('#svg #map .loc#' + directions[i]).addClass('hilite'); // hilite each block in the path
                }
            }
        }

        function checkSelect(event) {
            var selectOnClick = $('#svg #map').attr('select-on-click');
            if (selectOnClick != 'false') {

                $q.when(Locations.get(this.id)).then(function(loc) {
                    vm.selectNode[selectOnClick] = loc;
                });

                $('#svg #map #outer-border').removeClass('select-me');
                $('#svg #map').attr('select-on-click', 'false');
            }
        }

        function documentReady() {
            $('#svg').on('click', '#map .loc:not(.path)', checkSelect);

            for (var i = 0; i < DEPARTMENT_NAMES.length; i++) {
                $(".dep_list ." + DEPARTMENT_NAMES[i]).hover(
                    // attach hover element to each legend component so that hovering over text
                    // makes all corresponding locations highlight
                    batchToggleClass([".loc." + DEPARTMENT_NAMES[i] + ":not(.filter-out), " +
                        ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_colorbox",
                        ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_text"
                    ], ["hilite", "normal-text"]));

                // attach hover element to each loc component so that hovering over location
                // makes the corresponding legend item highlight
                $(".loc:not(.filter-out)." + DEPARTMENT_NAMES[i]).hover(
                    batchToggleClass([".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_colorbox",
                        ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_text"
                    ], ["hilite", "normal-text"]));
            }
        }
    }




    // debugging to get neighbors
    // $('#svg').on('click', '#map .loc', function() { console.log(this.id); });

    // debugging to highlight neighbors
    /*
    $('#svg').on('click', '#map .loc', function() {
        var n = Graphing.graph.nodes[this.id];
        $("#svg #map .loc").removeClass("hilite"); // clear old path
        for (var i = 0; i < n._neighbors.length; i++) {
            $("#" + n._neighbors[i]).addClass("hilite");
        }
    });
    */

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