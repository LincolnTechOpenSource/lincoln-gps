/* account.controller.js */

angular.module('account.controller', [])
  .controller('AccountCtrl', function($scope, $rootScope, HIGHLIGHT_COLOR) {

    $scope.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };

    /** batchChangeCSS: changes the CSS of the specified @selectors to @props
     * changes an array of selectors to their corresponding properties */
    var batchChangeCSS = function(selectors, props) {
      return function() {
        console.assert(selectors.length == props.length, 'Invalid Call to batchChangeCSS');
        for (var i = 0; i < selectors.length; i++) {
          // $(selectors[i]).css(props[i]);
          $(selectors[i]).toggleClass(props[i]);
        }
      };
    };

    // array of deparment class names
    var departmentHovers = [
      'account_setup',
      'accounting',
      'acd',
      'asset_mgmt',
      'branch_dev',
      'branch_serv',
      //'break_area',
      'broom',
      'busi_dev',
      'compli_licens',
      'conf',
      'doc_mgmt',
      'elevator_exit',
      'euc',
      'exec_suite',
      'finance',
      'food',
      'hr',
      'isd',
      'im_r',
      'isa',
      'mrkt_comm',
      'one_time_financials',
      'ops',
      'prvd_mgmt',
      'quality_cntrl',
      'reception',
      'rdi',
      'retire_serv',
      'stairs_exit',
      'tpa',
      'vsa'
    ];

    $(document).ready(function() {
      //$('#svg2').on('click', '#map2 g *', function() {console.log(this.id);});

      // attach hover element to each legend component so that hovering over text
      // makes all corresponding locations highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".list." + departmentHovers[i]).hover(
          batchChangeCSS([".loc." + departmentHovers[i] + ", " +
            ".list." + departmentHovers[i] + " .colorbox_list",
            ".list." + departmentHovers[i] + " .text_list"
          ], ["hilite", "normal-text"])
        );
      }

      // attach hover element to each loc component so that hovering over location
      // makes the corresponding legend item highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".loc." + departmentHovers[i]).hover(
          batchChangeCSS([".list." + departmentHovers[i] + " .colorbox_list",
            ".list." + departmentHovers[i] + " .text_list"
          ], ["hilite", "normal-text"]));
      }
    });

  });