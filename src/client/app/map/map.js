/**
 * map.js
 * 06/02/16
 **/
(function() {
    'use strict';

    angular
        .module('app.map')
        .controller('MapCtrl', MapCtrl);

    // jshint maxparams:15
    /* @ngInject */
    function MapCtrl($scope, $log, $q, $ionicGesture, $document, $localStorage,
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
            // Users.load().then(usersLoad);

            // $log.info('Activated Map View');
            return true;
        }

        /** functions for after users have loaded */
        function usersLoad() {
            $('#svg #map .loc').removeClass('filter-out'); // remove old filter
            for (var filter in $localStorage.prefs.filters) {
                if ($localStorage.prefs.filters.hasOwnProperty(filter)) {
                    if (!$localStorage.prefs.filters[filter].disp) {
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

        /** PanZoom button click functions */
        function zoomIn() {
            PanZoom.map.zoomIn();
        }
        function reset() {
            PanZoom.map.resize(); // resize needed for flexbox
            PanZoom.map.fit();
            PanZoom.map.center();
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
            var dirResults = Dijkstra.run(vm.selectNode.fromNode.id,
                vm.selectNode.toNode.id, Graphing.graph);

            // only clear and get path if results are not cached (e.g., new path)
            if (!dirResults.cached) {
                // clear old path and queue
                for (i = 0; i < vm.directions.length; i++) {
                    var el = getNodeByID(vm.directions[i]);
                    el.removeClass('hilite');
                    el.clearQueue();
                }
                // set new directions (will be the same as before if cached)
                vm.directions = Dijkstra.getPath(dirResults.prev, vm.selectNode.toNode.id);
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

                var dataIDs = $(event.currentTarget).data('id');
                if (dataIDs) {
                    console.log(dataIDs.split(' '));
                }

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