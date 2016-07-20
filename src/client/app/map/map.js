/**
 * map.js
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.map')
        .constant('GRAPH_URL', 'data/graph.json')
        .controller('MapCtrl', MapCtrl);

    // jshint maxparams:15
    /* @ngInject */
    function MapCtrl($scope, $log, $q, $ionicGesture, $document, $localStorage,
        UNITS, GRAPH_URL, NODE_TYPES, Locations, Firebase, Graphing, Params, SvgPanZoom) {
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
            SvgPanZoom.map.zoom(SvgPanZoom.map.getZoom() * ev.gesture.scale);
        }, $('#map'));

        // initialize & create graph
        Graphing.createGraph(GRAPH_URL, true); // pass true for graph debugging

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

            filterMap();

            // $log.info('Activated Map View');
            return true;
        }

        /** filter the map according to preferences */
        function filterMap() {
            $('#svg #map .loc').removeClass('filter-out'); // remove old filter

            // filter each preference that has display false
            var filters = $localStorage.prefs.filters;
            for (var filter in filters) {
                if (filters.hasOwnProperty(filter)) {
                    if (!filters[filter].disp) {
                        $('#svg #map .loc.' + filter).addClass('filter-out');
                    }
                }
            }
        }

        /** handle user authentication */
        function userAuth(user) {
            if (user) {
                var promises = [ allArray() ];

                return $q.all(promises).then();
            }
            else {
                Locations.unload();
                vm.selectNode.nodes = null;
            }
        }

        /** load the Locations table as an array */
        function allArray() {
            return $q.when(Locations.allArray()).then(function(data) {
                vm.selectNode.nodes = data;
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
            $('#svg #map g.non-walls .path').clearQueue();

            if (vm.selectNode[locSelect] !== vm.selectNode.toNode ||
                vm.selectNode[locSelect] !== vm.selectNode.fromNode) {
                var el = getNodeByID(vm.selectNode[locSelect].id);
                el.removeClass('hilite');
            }
            vm.selectNode[locSelect] = null; // clear the location
        }

        /** swaps the from and to locations */
        function swap() {
            var tmpNode = vm.selectNode.fromNode;
            vm.selectNode.fromNode = vm.selectNode.toNode;
            vm.selectNode.toNode = tmpNode;
        }

        /** SvgPanZoom button click functions */
        function zoomIn() {
            SvgPanZoom.map.zoomIn();
        }
        function reset() {
            SvgPanZoom.map.resize(); // resize needed for flexbox
            SvgPanZoom.map.fit();
            SvgPanZoom.map.center();
        }
        function zoomOut() {
            SvgPanZoom.map.zoomOut();
        }

        /** hover functions for the legend (mouseenter and mouseleave)
         * attach hover element to each legend component so that hovering over text
         * makes all corresponding locations highlight
         */
        function legendHover(ev) {
            var code = $(ev.currentTarget).data('code');

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
                    getNodeByID(newNode.id).addClass('hilite');
                }
            }

            if (!!oldNode && (newNode !== oldNode) &&
                vm.selectNode[node === 'toNode' ? 'fromNode' : 'toNode'] !== oldNode) {
                getNodeByID(oldNode.id).removeClass('hilite');
            }
        }

        function findDirections() {
            var i = 0; // for loops

            if (!vm.selectNode.fromNode || !vm.selectNode.toNode) {
                return;
            }
            var dirResults = Graphing.runDijkstra(NODE_TYPES.PATH, vm.selectNode.fromNode.id,
                vm.selectNode.toNode.id);

            // only clear and get path if results are not cached (e.g., new path)
            if (!dirResults.cached) {
                // clear old path and queue
                for (i = 0; i < vm.directions.length; i++) {
                    var el = getNodeByID(vm.directions[i]);
                    el.removeClass('hilite');
                    el.clearQueue();
                }
                // set new directions (will be the same as before if cached)
                vm.directions = Graphing.getShortestPath();
            }

            // reset view for long paths
            if (dirResults.dist[vm.selectNode.toNode.id] > 50) {
                reset();
            }

            // hilite each block in the path (immediately highlight the to node)
            $('#svg #map .loc#' + vm.selectNode.toNode.id).addClass('hilite');
            for (i = 0; i < vm.directions.length; i++) {
                // highlight with 50ms delay to animate "walking"
                getNodeByID(vm.directions[i]).delay(50 * i).queued('addClass', 'hilite');

                // // highlight all at once
                // getNodeByID(vm.directions[i]).addClass('hilite');
            }
        }

        // TODO: handle case when data-id is array
        function checkSelect(event) {
            var selectOnClick = $('#svg #map').attr('select-on-click');

            if (selectOnClick !== 'false') {
                // id is an array (usually only 1 element) representing locations
                var id = event.currentTarget.id;

                $q.when(Locations.get(id)).then(function(loc) {
                    vm.selectNode[selectOnClick] = loc;
                });

                // var dataIDs = $(event.currentTarget).data('id');
                // if (dataIDs) {
                //     console.log(dataIDs.split(' '));
                // }

                $('#svg #map #outer-border').removeClass('select-me');
                $('#svg #map').attr('select-on-click', 'false');
            }
        }

        function documentReady() {
            $('#svg').on('click', '#map .loc:not(.path)', checkSelect);

            // attach hover element to each loc component so that hovering over location
            // makes the corresponding legend item highlight
            for (var i = 0; i < UNITS.ALL.length; i++) {
                $('.loc:not(.filter-out).' + UNITS.ALL[i].depCode).hover(
                    batchToggleClass(['.dep-list .' + UNITS.ALL[i].depCode + ' .dep-list-colorbox',
                        '.dep-list .' + UNITS.ALL[i].depCode + ' .dep-list-text'
                    ], ['hilite', 'normal-text']));
            }



            // SvgPanZoom.init();
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

        /** getNodeByID: retrieves an SVG node given the @id (checks data-id) */
        function getNodeByID(id) {
            var el = $('#svg #map #' + id);
            // if element with id does not exist, check in data-id
            if (el.length <= 0) {
                el = $('#svg #map [data-id~="' + id + '"]');
            }
            return el;
        }

    } //end mapCntrl
})();



// // debugging to get neighbors
// $('#svg').on('click', '#map .loc', function() {
//     console.log(this.id);
// });

// // debugging to highlight neighbors
// $('#svg').on('click', '#map .loc', function() {
//     var n = Graphing.graph.nodes[this.id];
//     $('#svg #map .loc').removeClass('hilite'); // clear old path
//     for (var i = 0; i < n._neighbors.length; i++) {
//         $('#' + n._neighbors[i]).addClass('hilite');
//     }
// });