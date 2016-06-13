// firebase.services.js

angular.module('firebase.services', ['firebase'])
    // handle employee table queries
    .factory('Locations', function($firebaseArray, $firebaseAuth) {
        // Might use a resource here that returns a JSON array
        var db = firebase.database().ref('locations');
        var locations = null;

        $firebaseAuth().$onAuthStateChanged(function(user) {
            if (user) {
                locations = $firebaseArray(db)
            }
            else {
                locations = null;
            }
        });


        return {
            /** all: returns all employees */
            all: function() {
                return locations;
            },
            /** getByNType: returns all the locations of nType @nType */
            getByNType: function(nType) {
                if (!!locations) {
                    return $firebaseArray(db.orderByChild("nType").equalTo(nType));
                } else {
                    return null;
                }
            },
            /** get: returns the location information specified by @locID */
            get: function(locID) {
                return locations ? locations.$getRecord(locID) : null;
            }
        };
    })
    // handle firebase authenticator
    .factory('Auth', function($firebaseAuth) {
        return $firebaseAuth();
    });