// firebase.js
(function() {
    'use strict';

    angular.module('app.core')
        .constant('CONFIG', {
            apiKey: 'AIzaSyBJmytcwYLNjfjPp4beCPewJ6XKE7mRYJs',
            authDomain: 'lincoln-gps.firebaseapp.com',
            databaseURL: 'https://lincoln-gps.firebaseio.com',
            storageBucket: 'lincoln-gps.appspot.com',
        })
        .factory('Firebase', Firebase);

    // General Firebase services
    /* @ngInject */
    function Firebase($firebaseAuth, CONFIG) {
        var isInit = false;

        var service = {
            init: init,
            auth: auth
        };

        return service;

        //------------------------------------------------//

        function init() {
            // Initialize Firebase with credentials
            if (!isInit) {
                /* global firebase */
                firebase.initializeApp(CONFIG);
                isInit = true;
            }
        }

        function auth() {
            // handle firebase authenticator
            return $firebaseAuth();
        }
    }
})();