// lodash.js
(function() {
   'use strict';

   /* Make lodash an injectable service */
   angular.module('app.utils')
      .factory('_', function($window) {
          return $window._; // assumes underscore has already been loaded on the page
      });
})();