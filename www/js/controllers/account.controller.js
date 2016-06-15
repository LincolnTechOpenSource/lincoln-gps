/* account.controller.js */

angular.module('account.controller', [])
  .controller('AccountCtrl', function($scope, $rootScope, HIGHLIGHT_COLOR) {

    $scope.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };

    /** changeCSS: changes the CSS of the specified @selector to @props */
    var changeCSS = function(selector, props) {
      return function() {
        $(selector).css(props);
      };
    };

    var changeColorAndUnderline = function(selector1, color1, selector2, color2, style) {
      return function() {
        $(selector1).css({
          fill: color1
        });
        $(selector2 + ' .text_list').css({
          fill: color2,
          'text-decoration': style
        });
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
          changeCSS(".loc." + departmentHovers[i][0] + ", " +
            ".list_" + departmentHovers[i][0] + " .colorbox_list", {
              fill: HIGHLIGHT_COLOR
            }),
          changeCSS(".loc." + departmentHovers[i][0] + ", " +
            ".list_" + departmentHovers[i][0] + " .colorbox_list", {
              fill: departmentHovers[i][1]
            })
        );
      }

      // attach hover element to each loc component so that hovering over location
      // makes the corresponding legend item highlight
      for (var i = 0; i < departmentHovers.length; i++) {
        $(".loc."+departmentHovers[i][0]).hover(
          changeColorAndUnderline(".list_" + departmentHovers[i][0] + " .colorbox_list",
            HIGHLIGHT_COLOR, ".list_" + departmentHovers[i][0], departmentHovers[i][1], 'underline'),
          changeColorAndUnderline(".list_" + departmentHovers[i][0] + " .colorbox_list", departmentHovers[i][1],
            ".list_" + departmentHovers[i][0], 'black', 'none'));
      }

    });

  });