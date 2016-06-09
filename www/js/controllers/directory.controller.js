/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('directory.controller', [])
    .controller('DirectoryCtrl', ['$scope', '$state', 'Employees', 'Auth',
        function($scope, $state, Employees, Auth) {

            $scope.selectEmployee = {
                employees: Employees.all(),
                employee: null
            };

            // load employees when signed in
            Auth.$onAuthStateChanged(function(user) {
                if (user) {
                    $scope.selectEmployee.employees = Employees.all();
                }
                else {
                    $scope.selectEmployee.employees = null;
                }
            });
        }
    ]);
