/**
 * map.controller.js
 * Matthew Vasseur
 * 06/02/16
 **/

var mapCtrl = angular.module('map.controller', []);

mapCtrl.controller('MapCtrl', ['$rootScope', '$scope', '$stateParams', '$compile',
    'Locations', 'Firebase', 'DEPARTMENT_NAMES', 'Graphing',
    function($rootScope, $scope, $stateParams, $compile, Locations, Firebase, DEPARTMENT_NAMES, Graphing) {

        $scope.selectNode = {
            nodes: null, // only load if user is authenticated
            fromNode: null, // this will also serve as the parameter employee
            toNode: null,
            FIND_ON_MAP: "FIND_ON_MAP"
        };

        // load employees when signed in
        Firebase.auth().$onAuthStateChanged(function(user) {
            if (user) {
                $scope.selectNode.nodes = Locations.all(); // load locations
            }
            else {
                $scope.selectNode.nodes = null;
            }
        });

        // handle employee parameter
        if (!!$stateParams.employee) {
            // set current employee and from node given parameter
            $scope.selectNode.fromNode = $stateParams.employee;
        }

        // filter the map as prescribed
        for (var filter in $rootScope.filters) {
            if (!$rootScope.filters[filter].disp) {
                $('#svg #map .loc.' + filter).addClass('filter-out');
            }
        }

        // resets the path and removes all highlights (but leaves employee)
        $scope.clear = function() {
            $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path

            // clear graphing parameters (keep source if employee is defined)
            $scope.selectNode.toNode = null;
            $scope.selectNode.fromNode = null;
        };

        /** resets the selected location and removes path highlighting
         * @locSelect will be either "fromNode" or "toNode" (e.g., a field of selectNode)
         */
        $scope.clearLocation = function(locSelect) {
            // remove highlighting from path
            $("#svg #map g.non-walls .path").removeClass("hilite");
            if ($scope.selectNode[locSelect] !== $scope.selectNode.toNode ||
                $scope.selectNode[locSelect] !== $scope.selectNode.fromNode) {
                $('#svg #map #' + $scope.selectNode[locSelect].id).removeClass('hilite');
            }
            $scope.selectNode[locSelect] = null; // clear the location
        };

        // watch to find directions
        $scope.$watch("selectNode.toNode", function(newNode, oldNode) {
            // select on map option
            if (newNode === $scope.selectNode.FIND_ON_MAP) {
                $scope.selectNode.toNode = null; // clear value
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
            if (!!oldNode && ($scope.selectNode.fromNode !== oldNode) && (newNode !== oldNode)) {
                $('#svg #map #' + oldNode.id).removeClass('hilite');
            }

        });
        $scope.$watch("selectNode.fromNode", function(newNode, oldNode) {
            // select on map option
            if (newNode === $scope.selectNode.FIND_ON_MAP) {
                $scope.selectNode.fromNode = null; // clear value
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
            if (!!oldNode && ($scope.selectNode.toNode !== oldNode) && (newNode !== oldNode)) {
                $('#svg #map #' + oldNode.id).removeClass('hilite');
            }
        });

        var findDirections = function() {
            if (!!$scope.selectNode.fromNode && !!$scope.selectNode.toNode) {
                var dirResults = Dijkstra.run($scope.selectNode.fromNode.$id,
                    $scope.selectNode.toNode.$id, Graphing.graph);

                //console.assert(false, dirResults);

                var directions = Dijkstra.getPath(dirResults.prev, $scope.selectNode.toNode.$id);

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
                    $scope.selectNode[selectOnClick] = loc;
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
            //     var n = $rootScope.Graphing.graph.nodes[this.id];
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
]);

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