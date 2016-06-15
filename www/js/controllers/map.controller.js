/**
 * map.controller.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('map.controller', [])

.controller('MapCtrl', ['$rootScope', '$scope', '$stateParams', '$compile', 'Locations',
    'Users', 'Auth',
    function($rootScope, $scope, $stateParams, $compile, Locations, Users, Auth) {

        $scope.selectNode = {
            nodes: Locations.all(),
            fromNode: null, // this will also serve as the parameter employee
            toNode: null,
            FIND_ON_MAP: "FIND_ON_MAP"
        };

        // load employees when signed in
        Auth.$onAuthStateChanged(function(user) {
            if (user) {
                $scope.selectNode.nodes = Locations.all();
                //$scope.user = Users.get(Auth.$getAuth().uid);
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
                $('#svg #map .' + filter).addClass('filter-out');
            }
        }

        // resets the path and removes all highlights (but leaves employee)
        $scope.clear = function() {
            $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path

            // clear graphing parameters (keep source if employee is defined)
            // $scope.selectNode.toNode = null;
            // $scope.selectNode.fromNode = null;
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
                    $scope.selectNode.toNode.$id, $rootScope.Graphing.graph);

                var directions = Dijkstra.getPath(dirResults.prev, $scope.selectNode.toNode.$id);

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
    }
]);