// firebase.js
(function() {
    'use strict';

    angular.module('app.core')
        .factory('Firebase', Firebase);

    // General Firebase services
    /* @ngInject */
    function Firebase($firebaseAuth, FIREBASE_CONFIG) {
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
                firebase.initializeApp(FIREBASE_CONFIG);
                isInit = true;
            }
        }

        function auth() {
            // handle firebase authenticator
            return $firebaseAuth();
        }
    }
})();