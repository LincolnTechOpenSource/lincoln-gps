// lodash.js
(function() {
   'use strict';

   /* Make lodash an injectable service */
   // TODO: need browserify support to enable lodash through npm
   angular.module('app.utils')
      .factory('_', function($window) {
          return $window._; // assumes underscore has already been loaded on the page
      });
})();