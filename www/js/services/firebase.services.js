// firebase.services.js

angular.module('firebase.services', ['firebase'])
    // handle employee table
    .factory('Employees', function($firebaseArray) {
        // Might use a resource here that returns a JSON array
        var db = firebase.database().ref('employees');
        var employees = $firebaseArray(db);

        return {
            /** all: returns all employees */
            all: function() {
                return employees;
            },

            /** get: returns the employee specified by @employeeID */
            get: function(employeeID) {
                return employees.$getRecord(employeeID);
            }
        };
    });