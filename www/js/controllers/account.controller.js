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
          $(selectors[i]).css(props[i]);
        }
      };
    };

    // 2d array of the form [selector, original color]
    var departmentHovers = [
      ['branch_dev', 'red'],
      ['busi_dev', '#FF6600'],
      ['im_r', 'pink'],
      ['finance', '#00FF00'],
      ['acd', 'gray'],
      ['vsa', 'yellow'],
      ['accounting', '#006600'],
      ['ops', 'tomato'],
      ['tpa', 'coral'],
      ['mrkt_comm', '#3399FF'],
      ['prvd_mgmt', '#00FFFF'],
      ['isa', '#FFFF33'],
      ['retire_serv', '#990066'],
      ['quality_cntrl', 'violet'],
      ['asset_mgmt', 'lightgreen'],
      ['one_time_financials', 'sandybrown'],
      ['conf', 'lightblue'],
      ['hr', '#cccc00'],
      ['doc_mgmt', '#cc5200'],
      ['branch_serv', '#33cc33'],
      ['account_setup', '#ff8080'],
      ['compli_licens', '#ffff99'],
      ['euc', '#5cd65c'],
      ['rdi', '#ff3333'],
      ['isd', '#3377ff'],
      ['break_area', '#FF6633'],
      ['kitchen', 'lightgray'],
      ['stairs_exit', '#ff9988'],
      ['elevator_exit', '#ff9988'],
      ['reception', '#595959'],
      ['broom', 'lightgray'],
      ['exec_suite', 'lightgray']
    ];

    $(document).ready(function() {
      //$('#svg2').on('click', '#map2 g *', function() {console.log(this.id);});

      // attach hover element to each legend component so that hovering over text
      // makes all corresponding locations highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".list_" + departmentHovers[i][0]).hover(
          batchChangeCSS([".loc." + departmentHovers[i][0] + ", " +
            ".list_" + departmentHovers[i][0] + " .colorbox_list"
          ], [{
            fill: HIGHLIGHT_COLOR
          }]),
          batchChangeCSS([".loc." + departmentHovers[i][0] + ", " +
            ".list_" + departmentHovers[i][0] + " .colorbox_list"
          ], [{
            fill: departmentHovers[i][1]
          }])
        );
      }

      // attach hover element to each loc component so that hovering over location
      // makes the corresponding legend item highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".loc." + departmentHovers[i][0]).hover(
          batchChangeCSS([".list_" + departmentHovers[i][0] + " .colorbox_list",
            ".list_" + departmentHovers[i][0] + " .text_list"
          ], [{
            fill: HIGHLIGHT_COLOR
          }, {
            fill: departmentHovers[i][1],
            "text-decoration": "underline"
          }]),
          batchChangeCSS([".list_" + departmentHovers[i][0] + " .colorbox_list",
            ".list_" + departmentHovers[i][0] + " .text_list"
          ], [{
            fill: departmentHovers[i][1]
          }, {
            fill: "black",
            "text-decoration": "none"
          }]));
      }
    });

  });