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

    // 2d array of the form [selector, original color]
    /*var departmentHovers = [
      ['account_setup', '#FF8080'],
      ['accounting', '#006600'],
      ['acd', 'gray'],
      ['asset_mgmt', 'lightgreen'],
      ['branch_dev', 'red'],
      ['branch_serv', '#33CC33'],
      //['break_area', '#FF6633'],
      ['broom', '#787878'],
      ['busi_dev', '#FF6600'],
      ['compli_licens', '#FFFF99'],
      ['conf', 'lightblue'],
      ['doc_mgmt', '#CC5200'],
      ['elevator_exit', '#FF9988'],
      ['euc', '#5cd65c'],
      ['exec_suite', 'lightgray'],
      ['finance', '#00FF00'],
      ['food', 'lightgray'],
      ['hr', '#CCCC00'],
      ['isd', '#3377FF'],
      ['im_r', 'pink'],
      ['isa', '#FFFF33'],
      ['mrkt_comm', '#3399FF'],
      ['one_time_financials', 'sandybrown'],
      ['ops', 'tomato'],
      ['prvd_mgmt', '#00FFFF'],
      ['quality_cntrl', 'violet'],
      ['reception', '#595959'],
      ['rdi', '#FF3333'],
      ['retire_serv', '#990066'],
      ['stairs_exit', '#ff9988'],
      ['tpa', 'coral'],
      ['vsa', 'yellow']
    ]; */
    var departmentHovers = [
      ['account_setup'],
      ['accounting'],
      ['acd'],
      ['asset_mgmt'],
      ['branch_dev'],
      ['branch_serv'],
      //['break_area'],
      ['broom'],
      ['busi_dev'],
      ['compli_licens'],
      ['conf'],
      ['doc_mgmt'],
      ['elevator_exit'],
      ['euc'],
      ['exec_suite'],
      ['finance'],
      ['food'],
      ['hr'],
      ['isd'],
      ['im_r'],
      ['isa'],
      ['mrkt_comm'],
      ['one_time_financials'],
      ['ops'],
      ['prvd_mgmt'],
      ['quality_cntrl'],
      ['reception'],
      ['rdi'],
      ['retire_serv'],
      ['stairs_exit'],
      ['tpa'],
      ['vsa'],
    ];

    $(document).ready(function() {
      //$('#svg2').on('click', '#map2 g *', function() {console.log(this.id);});

      // attach hover element to each legend component so that hovering over text
      // makes all corresponding locations highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".list." + departmentHovers[i][0]).hover(
          batchChangeCSS([".loc." + departmentHovers[i][0] + ", " +
            ".list." + departmentHovers[i][0] + " .colorbox_list",
            ".list." + departmentHovers[i][0] + " .text_list"
          ], ["hilite", "normal-text"]),
          batchChangeCSS([".loc." + departmentHovers[i][0] + ", " +
            ".list." + departmentHovers[i][0] + " .colorbox_list",
            ".list." + departmentHovers[i][0] + " .text_list"
          ], ["hilite", "normal-text"])
        );
      }

      // attach hover element to each loc component so that hovering over location
      // makes the corresponding legend item highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".loc." + departmentHovers[i][0]).hover(
          batchChangeCSS([".list." + departmentHovers[i][0] + " .colorbox_list",
            ".list." + departmentHovers[i][0] + " .text_list"
          ], ["hilite", "normal-text"]),
          batchChangeCSS([".list." + departmentHovers[i][0] + " .colorbox_list",
            ".list." + departmentHovers[i][0] + " .text_list"
          ], ["hilite", "normal-text"]));
      }
    });

  });