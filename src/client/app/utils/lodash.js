/* lodash.js
 * NOTE: In order to enable lodash, add "./node_modules/lodash/lodash.js" to
 * gulp.config.json under 'vendorjs'
 */
(function() {
   'use strict';

   /* Make lodash an injectable service */
   angular.module('app.utils')
      .factory('_', function($window) {
          return $window._; // assumes underscore has already been loaded on the page
      });
})();
