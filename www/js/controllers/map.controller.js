/**
 * map.controller.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('map.controller', [])

.controller('MapCtrl', ['$scope', '$stateParams', '$compile', 'Employees',
    function($scope, $stateParams, $compile, Employees) {
        // reset Graphing fields
        Graphing.source = Graphing.target = null;
        Graphing.setSource = true;

        // handle employee parameter
        if (!!$stateParams.employee) {
            $scope.employee = $stateParams.employee;
            // set source to employee
            Graphing.setSource = false;
            Graphing.source = $scope.employee.id;

            $('#svg #map #' + $scope.employee.id).addClass('hilite'); // hilite him
        }

        // resets the path and removes all highlights (but leaves employee)
        $scope.clearPath = function() {
            $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path

            // clear graphing parameters (keep source if employee is defined)
            Graphing.target = null; // always clear target
            if (!$stateParams.employee) {
                Graphing.setSource = true;
                Graphing.source = null;
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
            $('#svg').on('click', '#map .non-walls *:not(.wall)', getDirs);
            $('#svg').on('click', '#map .desk', getEmployeeInfo);
            //$('div#svg').on('click', 'svg g *', function() {console.log(this.id);});
        });

        // finds and colors the shortest path from source to target in the graph
        function pathColor(s, t, g) {
            var results = Dijkstra.run(s, t, g); // get distances and previous
            var path = Dijkstra.getPath(results.prev, t); // find the path to t
            path.unshift(s); // add s to the beginning (so that it is hilited too)

            $("#svg #map g.non-walls *").removeClass("hilite"); // clear old path
            for (var i = 0; i < path.length; i++) {
                $('#svg #map #' + path[i]).addClass('hilite'); // hilite each block in the path
            }
        }

        // gets directions from source to target on click
        function getDirs(event) {
            if (Graphing.setSource) {
                Graphing.source = this.id;
            }
            else {
                Graphing.target = this.id;
            }
            Graphing.setSource = !Graphing.setSource;

            if (Graphing.target !== null) {
                pathColor(Graphing.source, Graphing.target, Graphing.graph);
            }
        }

        // updates the display with the employees information on click (and hilites)
        function getEmployeeInfo(event) {
            $scope.employee = Employees.get(this.id);

            $('#svg #' + this.id).addClass('hilite'); // hilite the guy clicked
            $scope.$apply();
        }
    }
]);