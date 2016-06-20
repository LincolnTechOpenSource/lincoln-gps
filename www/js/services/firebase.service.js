// firebase.service.js

(function() {
    'use strict';

    angular.module('firebase.service', ['firebase'])
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
        .constant('CONFIG', {
            apiKey: "AIzaSyBJmytcwYLNjfjPp4beCPewJ6XKE7mRYJs",
            authDomain: "lincoln-gps.firebaseapp.com",
            databaseURL: "https://lincoln-gps.firebaseio.com",
            storageBucket: "lincoln-gps.appspot.com",
        })
        .factory('Users', Users)
        .factory('Firebase', Firebase);

    // handle users table queries
    Users.inject = ['$firebaseAuth', '$firebaseArray'];
    function Users($firebaseArray, $firebaseAuth) {
        var service = {
            users: null,

            load: load,
            unload: unload,
            get: get,
            set: set
        };

        // init();
        return service;

        //------------------------------------------------//

        // function init() {
        //     $firebaseAuth().$onAuthStateChanged(function(user) {
        //         if (user) {

        //         }
        //         else {
        //             service.users = null;
        //         }
        //     });
        // }

        function load() {
            var db = firebase.database().ref('users');
            service.users = $firebaseArray(db);
        }

        function unload() {
            service.users = null;
        }

        /** get: returns the user specified by @uid via a promise */
        function get(uid) {
            return service.users.$loaded(function(users) {
                return users.$getRecord(uid);
            });
        }

        /** set: sets the user @uid's @key to @value */
        function set(uid, key, value) {
            service.users.$loaded(function(users) {
                var index = users.$indexFor(uid);
                users[index][key] = value;
                users.$save(index);
            });
        }
    }

    // General Firebase services
    Firebase.$inject = ['$firebaseAuth', 'CONFIG'];
    function Firebase($firebaseAuth, CONFIG) {
        var service = {
            init: init,
            auth: auth
        };

        return service;

        //------------------------------------------------//

        function init() {
            // Initialize Firebase with credentials
            firebase.initializeApp(CONFIG);
        }

        function auth() {
            // handle firebase authenticator
            return $firebaseAuth();
        }
    }
})();