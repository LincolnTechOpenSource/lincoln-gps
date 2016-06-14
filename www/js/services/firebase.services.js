// firebase.services.js

angular.module('firebase.services', ['firebase'])
    // handle locations table queries
    .factory('Locations', function($firebaseArray, $firebaseAuth) {
        // Might use a resource here that returns a JSON array
        var db = firebase.database().ref('locations');
        var locations = null;

        $firebaseAuth().$onAuthStateChanged(function(user) {
            if (user) {
                locations = $firebaseArray(db);
            }
            else {
                locations = null;
            }
        });

        return {
            /** all: returns all locations */
            all: function() {
                return locations;
            },
            /** getByNType: returns all the locations of nType @nType */
            getByNType: function(nType) {
                if (!!locations) {
                    return $firebaseArray(db.orderByChild("nType").equalTo(nType));
                }
                else {
                    return null;
                }
            },
            /** get: returns the location information specified by @locID */
            get: function(locID) {
                return (!!locations ? locations.$getRecord(locID) : null);
            }
        };
    })
    // handle users table queries
    .factory('Users', function($firebaseArray, $firebaseAuth) {
        // Might use a resource here that returns a JSON array
        var db = firebase.database().ref('users');
        var users = null;

        $firebaseAuth().$onAuthStateChanged(function(user) {
            if (user) {
                users = $firebaseArray(db)
            }
            else {
                users = null;
            }
        });

        return {
            /** all: returns all users */
            all: function() {
                return users;
            },
            /** get: returns the user specified by @uid */
            get: function(uid) {
                return (!!users ? users.$getRecord(uid) : null);
            },
            /** set: sets the user's, @uid, @key to @value */
            set: function(uid, key, value) {
                var user = users.$getRecord(uid);
                user[key] = value;
                users.$save(uid);
            }
        };
    })
    // handle firebase authenticator
    .factory('Auth', function($firebaseAuth) {
        return $firebaseAuth();
    });