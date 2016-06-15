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
            /** get: returns the location information specified by @locID via a promise */
            get: function(locID) {
                return locations.$loaded(function(locations) {
                    return locations.$getRecord(locID);
                });
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
            /** get: returns the user specified by @uid via a promise */
            get: function(uid) {
                return users.$loaded(function(users) {
                    return users.$getRecord(uid);
                });
            },
            /** set: sets the user @uid's @key to @value */
            set: function(uid, key, value) {
                users.$loaded(function(users) {
                    var index = users.$indexFor(uid);
                    users[index][key] = value;
                    users.$save(index);
                });
            }
        };
    })
    // handle firebase authenticator
    .factory('Auth', function($firebaseAuth) {
        return $firebaseAuth();
    });