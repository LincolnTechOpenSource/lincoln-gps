/**
 * map.js
 * Matthew Vasseur
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.map')
        .controller('MapCtrl', MapCtrl);

    // jshint maxparams:15
    /* @ngInject */
    function MapCtrl($rootScope, $scope, $log, $q, $ionicGesture, $document,
        currentUser, UNITS, Users, Locations, Firebase, Graphing, Params, Dijkstra, PanZoom) {
        var vm = this;

        vm.selectNode = {
            nodes: null, // only load if user is authenticated
            fromNode: null, // this will also serve as the parameter employee
            toNode: null,
            FIND_ON_MAP: 'FIND_ON_MAP'
        };
        vm.directions = []; // current directions
        vm.deps = [
            UNITS.ALL.slice(0, 14),
            UNITS.ALL.slice(14)
        ];

        vm.clearLocation = clearLocation;
        vm.swap = swap;

        vm.zoomIn = zoomIn;
        vm.reset = reset;
        vm.zoomOut = zoomOut;

        vm.legendHover = legendHover;

        $scope.$watch('vm.selectNode.toNode', watchNode.bind(null, 'toNode'));
        $scope.$watch('vm.selectNode.fromNode', watchNode.bind(null, 'fromNode'));

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(userAuth);

        // ready document specific commands
        $document.ready(documentReady);

        // activate the controller on view enter
        $scope.$on('$ionicView.enter', activate);

        // enable pinch to zoom (for mobile)
        $ionicGesture.on('pinch', function(ev) {
            PanZoom.map.zoom(PanZoom.map.getZoom() * ev.gesture.scale);
        }, $('#map'));

        // initialize & create graph
        Graphing.debug = true; // debug for testing purposes
        Graphing.createGraph();

        //------------------------------------------------//

        /** run upon controller activate */
        function activate() {
            // handle employee parameter
            if (!!Params.employee) {
                $('#svg #map g.non-walls .path').removeClass('hilite'); // clear
                // set current employee and from node given parameter
                vm.selectNode.fromNode = Params.employee;
                vm.selectNode.toNode = null; // null out 'to'
                Params.employee = null; // null out parameter after 'use'
            }

            // filter the map as prescribed
            Users.load().then(usersLoad);

            // $log.info('Activated Map View');
            return true;
        }

        /** functions for after users have loaded */
        function usersLoad() {
            var user = $rootScope.user || Users.get(currentUser.uid);
            $('#svg #map .loc').removeClass('filter-out'); // remove old filter
            for (var filter in user.filters) {
                if (user.filters.hasOwnProperty(filter)) {
                    if (!user.filters[filter].disp) {
                        $('#svg #map .loc.' + filter).addClass('filter-out');
                    }
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
                vm.selectNode.nodes = Locations.all();
                return true;
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

        /** resets the selected location and removes path highlighting
         * @locSelect will be either 'fromNode' or 'toNode' (e.g., a field of selectNode)
         */
        function clearLocation(locSelect) {
            // remove highlighting from path
            $('#svg #map g.non-walls .path').removeClass('hilite');
            if (vm.selectNode[locSelect] !== vm.selectNode.toNode ||
                vm.selectNode[locSelect] !== vm.selectNode.fromNode) {
                $('#svg #map #' + vm.selectNode[locSelect].id).removeClass('hilite');
            }
            vm.selectNode[locSelect] = null; // clear the location
        }

        /** swaps the from and to locations */
        function swap() {
            var tmpNode = vm.selectNode.fromNode;
            vm.selectNode.fromNode = vm.selectNode.toNode;
            vm.selectNode.toNode = tmpNode;
        }

        /** PanZoom button click functions */
        function zoomIn() {
            PanZoom.map.zoomIn();
        }
        function reset() {
            PanZoom.map.fit();
            PanZoom.map.center();
            PanZoom.map.resetZoom();
        }
        function zoomOut() {
            PanZoom.map.zoomOut();
        }

        /** hover functions for the legend (mouseenter and mouseleave)
         * attach hover element to each legend component so that hovering over text
         * makes all corresponding locations highlight
         */
        function legendHover(ev) {
            var code = angular.element(ev.currentTarget).data('code');

            $('.loc.' + code + ':not(.filter-out)').toggleClass('hilite');
            $('.dep-list .' + code + ' .dep-list-colorbox').toggleClass('hilite');
            $('.dep-list .' + code + ' .dep-list-text').toggleClass('normal-text');
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
                if (!!newNode) {
                    $('#svg #map #' + newNode.id).addClass('hilite');
                }
            }
        }

        function findDirections() {
            // if (!!vm.selectNode.fromNode && !!vm.selectNode.toNode) {
            if (!vm.selectNode.fromNode || !vm.selectNode.toNode) {
                return;
            }
            var dirResults = Dijkstra.run(vm.selectNode.fromNode.id,
                vm.selectNode.toNode.id, Graphing.graph);

            if (dirResults.cached) {
                return; // stop if the results are the same !
            }

            // clear old path and queue
            for (var i = 0; i < vm.directions.length; i++) {
                $('#svg #map .loc#' + vm.directions[i]).removeClass('hilite');
                $('#svg #map .loc#' + vm.directions[i]).clearQueue();
            }
            // set new directions
            vm.directions = Dijkstra.getPath(dirResults.prev, vm.selectNode.toNode.id);

            // reset view for long paths
            if (dirResults.dist[vm.selectNode.toNode.id] > 50) {
                reset();
            }

            // hilite each block in the path (immediately highlight from and to)
            for (i = 0; i < vm.directions.length; i++) {
                var j = Math.floor(i / 2); // show two at a time
                $('#svg #map .loc#' + vm.directions[i]).delay(100 * j).queued('addClass', 'hilite');
                // $('#svg #map .loc#' + vm.directions[i]).addClass('hilite');
            }
        }

        function checkSelect(event) {
            var id = event.target.id || $(event.target).parent('g')[0].id;
            var selectOnClick = $('#svg #map').attr('select-on-click');

            if (selectOnClick !== 'false') {
                $q.when(Locations.get(id)).then(function(loc) {
                    vm.selectNode[selectOnClick] = loc;
                });

                $('#svg #map #outer-border').removeClass('select-me');
                $('#svg #map').attr('select-on-click', 'false');
            }
        }

        function documentReady() {
            $('#svg').on('click', '#map .loc:not(.path)', checkSelect);

            // attach hover element to each loc component so that hovering over location
            // makes the corresponding legend item highlight
            for (var i = 0; i < UNITS.ALL.length; i++) {
                $('.loc:not(.filter-out).' + UNITS.ALL[i].code).hover(
                    batchToggleClass(['.dep-list .' + UNITS.ALL[i].code + ' .dep-list-colorbox',
                        '.dep-list .' + UNITS.ALL[i].code + ' .dep-list-text'
                    ], ['hilite', 'normal-text']));
            }

                    // initialize svg pan zoom and set height (magic 0.89)
                    $('#map').height($('#svg').height() * 0.89);
                    PanZoom.init();
        }

        /** batchToggleClass: toggles the @classes of the specified @selectors
         *  toggles the corresponding class of an array of selectors */
        function batchToggleClass(selectors, classes) {
            return function() {
                console.assert(selectors.length === classes.length, 'Invalid Call to batchToggleClass');
                for (var i = 0; i < selectors.length; i++) {
                    $(selectors[i]).toggleClass(classes[i]);
                }
            };
        }
    } //end mapCntrl
})();



// //       debugging to get neighbors
// $('#svg').on('click', '#map .loc', function() {
//     console.log(this.id);
// });

// //debugging to highlight neighbors
// $('#svg').on('click', '#map .loc', function() {
//     var n = Graphing.graph.nodes[this.id];
//     $('#svg #map .loc').removeClass('hilite'); // clear old path
//     for (var i = 0; i < n._neighbors.length; i++) {
//         $('#' + n._neighbors[i]).addClass('hilite');
//     }
// });

// /** resets the path and removes all highlights (but leaves employee) */
// function clear() {
//     $('#svg #map g.non-walls *').removeClass('hilite'); // clear old path

//     // clear graphing parameters
//     vm.selectNode.toNode = null;
//     vm.selectNode.fromNode = null;
// }