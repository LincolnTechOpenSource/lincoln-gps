/* account.controller.js */

var accountCtrl = angular.module('account.controller', []);

accountCtrl.controller('AccountCtrl', ['$scope', '$rootScope', 'DEPARTMENT_NAMES',
  function($scope, $rootScope, DEPARTMENT_NAMES) {

    $scope.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };

    /** batchToggleClass: toggles the @classes of the specified @selectors
     * toggles the corresponding class of an array of selectors */
    var batchToggleClass = function(selectors, classes) {
      return function() {
        console.assert(selectors.length == classes.length, 'Invalid Call to batchToggleClass');
        for (var i = 0; i < selectors.length; i++) {
          $(selectors[i]).toggleClass(classes[i]);
        }
      };
    };

    $(document).ready(function() {
      // $('#svg2').on('click', '#map2 .loc', function() {console.log(this.id);});


      for (var i = 0; i < DEPARTMENT_NAMES.length; i++) {
        $(".dep_list ." + DEPARTMENT_NAMES[i]).hover(
          // attach hover element to each legend component so that hovering over text
          // makes all corresponding locations highlight
          batchToggleClass([".loc." + DEPARTMENT_NAMES[i] + ", " +
            ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_colorbox",
            ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_text"
          ], ["hilite", "normal-text"]));

        // attach hover element to each loc component so that hovering over location
        // makes the corresponding legend item highlight
        $(".loc." + DEPARTMENT_NAMES[i]).hover(
          batchToggleClass([".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_colorbox",
            ".dep_list ." + DEPARTMENT_NAMES[i] + " .dep_list_text"
          ], ["hilite", "normal-text"]));
      }
    });

  }
]);