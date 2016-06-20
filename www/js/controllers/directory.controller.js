/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('directory.controller', [])
    .controller('DirectoryCtrl', ['$scope', '$state', '$ionicHistory', 'Locations', 'Firebase',
        function($scope, $state, $ionicHistory, Locations, Firebase) {

            $scope.selectEmployee = {
                employees: null, // only load if user is authenticated
                employee: null
            };

            // load employees when signed in
            Firebase.auth().$onAuthStateChanged(function(user) {
                if (user) {
                    Locations.load();
                    $scope.selectEmployee.employees = Locations.getByNType(NodeTypeEnum.DESK);
                }
                else {
                    Locations.unload();
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
