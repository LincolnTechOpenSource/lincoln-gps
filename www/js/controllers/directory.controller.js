/**
 * directory.js
 * Matthew Vasseur
 * 06/02/16
 **/

angular.module('directory.controller', [])
    .controller('DirectoryCtrl', ['$scope', '$state', 'Employees',
        function($scope, $state, Employees) {

            $scope.selectEmployee = {
                employees: Employees.all(),
                employee: null
            };
        }
    ]);