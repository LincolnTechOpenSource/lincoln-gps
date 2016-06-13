/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('directory.controller', [])
    .controller('DirectoryCtrl', ['$scope', '$state', 'Locations', 'Auth',
        function($scope, $state, Locations, Auth) {

            $scope.selectEmployee = {
                employees: Locations.getByNType(NodeTypeEnum.DESK),
                employee: null
            };

            // load employees when signed in
            Auth.$onAuthStateChanged(function(user) {
                if (user) {
                    $scope.selectEmployee.employees = Locations.getByNType(NodeTypeEnum.DESK);
                }
                else {
                    $scope.selectEmployee.employees = null;
                }
            });
        }
    ]);
