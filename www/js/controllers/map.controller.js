/**
 * map.controller.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('map.controller', [])

.controller('MapCtrl', ['$rootScope', '$scope', '$stateParams', '$compile', 'Locations',
    'Auth',
    function($rootScope, $scope, $stateParams, $compile, Locations, Auth) {
        // reset Graphing fields
        $rootScope.Graphing.source = $rootScope.Graphing.target = null;
        $rootScope.Graphing.setSource = true;

        $scope.selectNode = {
            nodes: Locations.all(),
            fromNode: null,
            toNode: null
        };

        // load employees when signed in
        Auth.$onAuthStateChanged(function(user) {
            if (user) {
                $scope.selectNode.nodes = Locations.all();
            }
            else {
                $scope.selectNode.nodes = null;
            }
        });

        // handle employee parameter
        if (!!$stateParams.employee) {
            // set current employee and from node given parameter
            $scope.employee = $stateParams.employee;
            $scope.selectNode.fromNode = $stateParams.employee;

            $rootScope.Graphing.setSource = false;
            //$rootScope.Graphing.source = $scope.employee.id;

            $('#svg #map #' + $scope.employee.id).addClass('hilite'); // hilite him
        }

        // filter the map as prescribed
        for (var filter in $rootScope.filters) {
            if (!$rootScope.filters[filter].disp) {
                $('#svg #map .' + filter).addClass('filter-out');
            }
        }

        // resets the path and removes all highlights (but leaves employee)
        $scope.clearPath = function() {
            $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path

            // clear graphing parameters (keep source if employee is defined)
            $scope.selectNode.toNode = null;
            //$rootScope.Graphing.target = null; // always clear target
            if (!$stateParams.employee) {
                $rootScope.Graphing.setSource = true;
                //$rootScope.Graphing.source = null;
                $scope.selectNode.fromNode.$id = null;
            }
            else {
                // keep employee hilited
                $('#svg #map #' + $scope.employee.id).addClass('hilite');
            }
        };

        // resets the selected employee and removes his highlight
        $scope.clearEmployee = function() {
            $('#svg #map #' + $scope.employee.id).removeClass('hilite');
            $scope.employee = null;
        };

        $(document).ready(function() {
            // set click functions for directions and information
            //$('#svg').on('click', '#map .non-walls *:not(.wall)', getDirs);
            $('#svg').on('click', '#map .desk', getEmployeeInfo);
            //$('div#svg').on('click', 'svg g *', function() {console.log(this.id);});

            // load pan zoom
            /*var panZoomMap = svgPanZoom('#svg #map', {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: true,
                center: true,
                beforePan: beforePan
            });

            $(window).resize(function() {
                panZoomMap.resize();
                panZoomMap.updateBBox();
                panZoomMap.fit();
                panZoomMap.center();
            });*/
        });

        /*
        function beforePan(oldPan, newPan) {
            var gutterWidth = 50,
                gutterHeight = 50,
                // Computed variables
                sizes = this.getSizes(),
                leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth,
                rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom),
                topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight,
                bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

            customPan = {}
            customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
            customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

            return customPan
        }
        */

        // finds and colors the shortest path from source to target in the graph
        function pathColor(s, t, g) {
            var results = Dijkstra.run(s, t, g); // get distances and previous
            var path = Dijkstra.getPath(results.prev, t); // find the path to t

            for (var i = 0; i < path.length; i++) {
                $('#svg #map #' + path[i]).addClass('hilite'); // hilite each block in the path
            }
        }

        // watch to find directions
        $scope.$watch("selectNode.toNode", function(newValue, oldValue) {
            findDirections();
        });
        $scope.$watch("selectNode.fromNode", function(newValue, oldValue) {
            findDirections();
        });

        var findDirections = function() {
            if (!!$scope.selectNode.fromNode && !!$scope.selectNode.toNode) {
                //console.log('finding...');

                //$rootScope.Graphing.source = $scope.selectNode.fromNode.$id;
                //$rootScope.Graphing.target = $scope.selectNode.toNode.$id;

                var dirResults = Dijkstra.run($scope.selectNode.fromNode.$id,
                    $scope.selectNode.toNode.$id, $rootScope.Graphing.graph);

                var directions = Dijkstra.getPath(dirResults.prev, $scope.selectNode.toNode.$id);

                $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path
                for (var i = 0; i < directions.length; i++) {
                    $('#svg #map #' + directions[i]).addClass('hilite'); // hilite each block in the path
                }
            }
        };

        // gets directions from source to target on click
        function getDirs(event) {
            if ($rootScope.Graphing.setSource) {
                $rootScope.Graphing.source = this.id;
            }
            else {
                $rootScope.Graphing.target = this.id;
            }
            $rootScope.Graphing.setSource = !$rootScope.Graphing.setSource;

            if ($rootScope.Graphing.target !== null) {
                pathColor($rootScope.Graphing.source, $rootScope.Graphing.target,
                    $rootScope.Graphing.graph);
            }
        }

        // updates the display with the employees information on click (and hilites)
        function getEmployeeInfo(event) {
            $scope.employee = Locations.get(this.id);

            $('#svg #' + this.id).addClass('hilite'); // hilite the guy clicked
            $scope.$apply();
        }
    }
]);