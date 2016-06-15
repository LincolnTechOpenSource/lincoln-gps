/* account.controller.js */

angular.module('account.controller', [])
  .controller('AccountCtrl', function($scope, $rootScope, HIGHLIGHT_COLOR) {

    $scope.resetToDefault = function() {
      for (var filter in $rootScope.filters) {
        $rootScope.filters[filter].disp = true;
      }
    };


    var changeColor = function(selector, color) {
      return function() {
        $(selector).css({
          fill: color
        });
      };
    };

    var changeColorAndUnderline = function(selector1, color1, selector2, color2, selector3, style) {
      return function() {
        $(selector1).css({
          fill: color1
        });
        $(selector2).css({
          fill: color2
        });
        $(selector3).css({
          'text-decoration': style
        });
      };
    };


    // 2d array of the form [legend text selector, map & colorbox selectors, original color]
    var departmentHovers = [
      ['#text_list_branch_dev', '.desk.branch_dev, #colorbox_list_branch_dev', 'red'],
      ['#text_list_busi_dev', '.desk.busi_dev, #colorbox_list_busi_dev', '#FF6600'],
      ['#text_list_imr', 'desk.imr, #colorbox_list_imr', 'pink'],
      ['#text_list_finance', '.desk.finance, #colorbox_list_finance', '#00FF00'],
      ['#text_list_acd', '.desk.cubicle.acd,  #colorbox_list_acd', 'gray' ],
      ['#text_list_vsa', '.desk.vsa, #colorbox_list_vsa', 'yellow' ],
      ['#text_list_accounting', '.desk.accounting, #colorbox_list_accounting', '#006600'],
      ['#text_list_operations', '.desk.ops, #colorbox_list_operations', 'tomato'],
      ['#text_list_tpa', '.desk.tpa, #colorbox_list_tpa', 'coral'],
      ['#text_list_mrkt_comm', '.desk.mrkt_comm, #colorbox_list_mrkt_comm', '#3399FF'],
      ['#text_list_prvd_mgmt', '.desk.prvd_mgmt, #colorbox_list_prvd_mgmt', '#00FFFF'],
      ['#text_list_isa', '.desk.isa, #colorbox_list_isa', '#FFFF33'],
      ['#text_list_retire_serv', '.desk.retire_serv, #colorbox_list_retire_serv', '#990066'],
      ['#text_list_quality_cntrl', '.desk.quality_cntrl, #colorbox_list_quality_cntrl', 'violet'],
      ['#text_list_asset_mgmt', '.desk.asset_mgmt, #colorbox_list_asset_mgmt', 'lightgreen'],
      ['#text_list_one_time_financials', '.desk.one_time_financials, #colorbox_list_one_time_financials', 'sandybrown'],
      ['#text_list_conf', '.desk.conf, #colorbox_list_conf', 'lightblue'],
      ['#text_list_hr', '.desk.hr, #colorbox_list_hr', '#cccc00'],
      ['#text_list_doc_mgmt', '.desk.doc_mgmt, #colorbox_list_doc_mgmt', '#cc5200'],
      ['#text_list_branch_serv', '.desk.branch_serv, #colorbox_list_branch_serv', '#33cc33'],
      ['#text_list_account_setup', '.desk.account_setup, #colorbox_list_account_setup', '#ff8080'],
      ['#text_list_compli_licens', '.desk.compli_licens, #colorbox_list_compli_licens', '#ffff99'],
      ['#text_list_euc', '.desk.euc, #colorbox_list_euc', '#5cd65c'],
      ['#text_list_rdi', '.desk.rdi, #colorbox_list_rdi', '#ff3333'],
      ['#text_list_isd', '.desk.isd, #colorbox_list_isd', '#3377ff'],
      ['#text_list_break_area', '.break_area, #colorbox_list_break_area', '#FF6633'],
      ['#text_list_kitchen', '.kitchen, #colorbox_list_kitchen', 'lightgray'],
      ['#text_list_stairs_exit', '.stairs_exit, #colorbox_list_stairs_exit', '#ff9988'],
      ['#text_list_elevator_exit', '.elevator_exit, #colorbox_list_elevator_exit', '#ff9988'],
      ['#text_list_reception', '.reception, #colorbox_list_reception', '#595959'],
      ['#text_list_broom', '.broom, #colorbox_list_broom', 'lightgray'],
      ['#text_list_exec_suite', '.exec_suite, #colorbox_list_exec_suite', 'lightgray']
    ];

      var departmentHoversFromMap = [
      ['#text_list_branch_dev', '.desk.branch_dev', '#colorbox_list_branch_dev', 'red'],
      ['#text_list_busi_dev', '.desk.busi_dev', '#colorbox_list_busi_dev', '#FF6600'],
      ['#text_list_imr', 'desk.imr', '#colorbox_list_imr', 'pink'],
      ['#text_list_finance', '.desk.finance', '#colorbox_list_finance', '#00FF00'],
      ['#text_list_acd', '.desk.cubicle.acd',  '#colorbox_list_acd', 'gray' ],
      ['#text_list_vsa', '.desk.vsa', '#colorbox_list_vsa', 'yellow' ],
      ['#text_list_accounting', '.desk.accounting', '#colorbox_list_accounting', '#006600'],
      ['#text_list_operations', '.desk.ops', '#colorbox_list_operations', 'tomato'],
      ['#text_list_tpa', '.desk.tpa', '#colorbox_list_tpa', 'coral'],
      ['#text_list_mrkt_comm', '.desk.mrkt_comm', '#colorbox_list_mrkt_comm', '#3399FF'],
      ['#text_list_prvd_mgmt', '.desk.prvd_mgmt', '#colorbox_list_prvd_mgmt', '#00FFFF'],
      ['#text_list_isa', '.desk.isa', '#colorbox_list_isa', '#FFFF33'],
      ['#text_list_retire_serv', '.desk.retire_serv', '#colorbox_list_retire_serv', '#990066'],
      ['#text_list_quality_cntrl', '.desk.quality_cntrl', '#colorbox_list_quality_cntrl', 'violet'],
      ['#text_list_asset_mgmt', '.desk.asset_mgmt', '#colorbox_list_asset_mgmt', 'lightgreen'],
      ['#text_list_one_time_financials', '.desk.one_time_financials', '#colorbox_list_one_time_financials', 'sandybrown'],
      ['#text_list_conf', '.desk.conf', '#colorbox_list_conf', 'lightblue'],
      ['#text_list_hr', '.desk.hr', '#colorbox_list_hr', '#cccc00'],
      ['#text_list_doc_mgmt', '.desk.doc_mgmt', '#colorbox_list_doc_mgmt', '#cc5200'],
      ['#text_list_branch_serv', '.desk.branch_serv', '#colorbox_list_branch_serv', '#33cc33'],
      ['#text_list_account_setup', '.desk.account_setup', '#colorbox_list_account_setup', '#ff8080'],
      ['#text_list_compli_licens', '.desk.compli_licens', '#colorbox_list_compli_licens', '#ffff99'],
      ['#text_list_euc', '.desk.euc', '#colorbox_list_euc', '#5cd65c'],
      ['#text_list_rdi', '.desk.rdi', '#colorbox_list_rdi', '#ff3333'],
      ['#text_list_isd', '.desk.isd', '#colorbox_list_isd', '#3377ff'],
      ['#text_list_break_area', '.break_area', '#colorbox_list_break_area', '#FF6633'],
      ['#text_list_kitchen', '.kitchen', '#colorbox_list_kitchen', 'lightgray'],
      ['#text_list_stairs_exit', '.stairs_exit', '#colorbox_list_stairs_exit', '#ff9988'],
      ['#text_list_elevator_exit', '.elevator_exit', '#colorbox_list_elevator_exit', '#ff9988'],
      ['#text_list_reception', '.reception', '#colorbox_list_reception', '#595959'],
      ['#text_list_broom', '.broom', '#colorbox_list_broom', 'lightgray'],
      ['#text_list_exec_suite', '.exec_suite', '#colorbox_list_exec_suite', 'lightgray']
    ];

    // For hovering over a department or facility on map legend list,
    //corresponding department desks or facility areas all highlight blue
    $(document).ready(function() {
      //$('#svg2').on('click', '#map2 g *', function() {console.log(this.id);});
      for (var i = 0; i < departmentHovers.length; i++) {
        $(departmentHovers[i][0]).hover(changeColor(departmentHovers[i][1], HIGHLIGHT_COLOR),
        changeColor(departmentHovers[i][1], departmentHovers[i][2]));
      }


   //for underlining a list item on the legend when corresponding desk or facility on map is hovered
      for(var j=0; j < departmentHoversFromMap.length; j++ ) {
        $(departmentHoversFromMap[j][1]).hover(changeColorAndUnderline(departmentHoversFromMap[j][2], HIGHLIGHT_COLOR,
        departmentHoversFromMap[j][0], departmentHoversFromMap[j][3],
        departmentHoversFromMap[j][0], 'underline'),
        changeColorAndUnderline(departmentHoversFromMap[j][2], departmentHoversFromMap[j][3],
        departmentHoversFromMap[j][0], 'black',
        departmentHoversFromMap[j][0], 'none'));
      }

    });

  });