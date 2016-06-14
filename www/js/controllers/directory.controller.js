/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('directory.controller', [])
    .controller('DirectoryCtrl', ['$scope', '$state', '$ionicHistory', 'Locations', 'Auth',
        function($scope, $state, $ionicHistory, Locations, Auth) {

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

            /*$scope.go = function(state, params) {
                //ui-sref="tab.map({employee: selectEmployee.employee})"
                //console.log(state);

                $ionicHistory.clearCache().then(function() {
                    $ionicHistory.clearHistory();
                    console.log($ionicHistory.viewHistory());
                    $state.go(state, params);
                });

            };*/
        }
    ]);
