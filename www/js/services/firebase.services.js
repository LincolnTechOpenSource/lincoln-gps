// firebase.services.js

angular.module('firebase.services', ['firebase'])
    // handle employee table queries
    .factory('Locations', function($firebaseArray, $firebaseAuth) {
        // Might use a resource here that returns a JSON array
        var db = firebase.database().ref('locations');
        var access = false;

        $firebaseAuth().$onAuthStateChanged(function(user) {
            if (user) {
                access = true;
            }
            else {
                access = false;
            }
        });


        return {
            /** all: returns all employees */
            all: function() {
                return access ? $firebaseArray(db) : null;
            },
            /** getByNType: returns all the locations of nType @nType */
            getByNType: function(nType) {
                if (access) {
                    return $firebaseArray(db.orderByChild("nType").equalTo(nType));
                } else {
                    return null;
                }
            },
            /** get: returns the location information specified by @locID */
            get: function(locID) {
                return access ? db.$getRecord(locID) : null;
            }
        };
    })
    // handle firebase authenticator
    .factory('Auth', function($firebaseAuth) {
        return $firebaseAuth();
    });