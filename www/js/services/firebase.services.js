// firebase.services.js

angular.module('firebase.services', ['firebase'])
    // handle employee table queries
    .factory('Employees', function($firebaseArray, $firebaseAuth) {
        // Might use a resource here that returns a JSON array
        var db = firebase.database().ref('employees');
        var employees = undefined;

        $firebaseAuth().$onAuthStateChanged(function(user) {
            if (user) {
                employees = $firebaseArray(db);
            }
            else {
                employees = null;
            }
        });


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
    })
    // handle firebase authenticator
    .factory('Auth', function($firebaseAuth) {
        return $firebaseAuth();
    });