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
      ['#text_list_reception', '.reception, #colorbox_list_reception', '#595959']
    ];

    // For hovering over a department or facility on map legend list,
    //corresponding department desks or facility areas all highlight blue
    $(document).ready(function() {
      for (var i = 0; i < departmentHovers.length; i++) {
        $(departmentHovers[i][0]).hover(changeColor(departmentHovers[i][1], HIGHLIGHT_COLOR), changeColor(departmentHovers[i][1], departmentHovers[i][2]));
      }

      //for(var i=0; i < departmentHovers.length; i++ )

    });


  //for underlining a list item on the legend when corresponding desk or facility on map is hovered



  /*  $(document).ready(function() {
      $('.desk.branch_dev').on("mouseover", function() {
        $('#colorbox_list_branch_dev').css({
          fill: "blue"
        });
        $('#text_list_branch_dev').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.branch_dev').on("mouseout", function() {
        $('#colorbox_list_branch_dev').css({
          fill: "red"
        });
        $('#text_list_branch_dev').css({
          'text-decoration': "none"
        });
      });
      $('.desk.im_r').on("mouseover", function() {
        $('#colorbox_list_imr').css({
          fill: "blue"
        });
        $('#text_list_imr').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.im_r').on("mouseout", function() {
        $('#colorbox_list_imr').css({
          fill: "pink"
        });
        $('#text_list_imr').css({
          'text-decoration': "none"
        });
      });
      $('.desk.busi_dev').on("mouseover", function() {
        $('#colorbox_list_busi_dev').css({
          fill: "blue"
        });
        $('#text_list_busi_dev').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.busi_dev').on("mouseout", function() {
        $('#colorbox_list_busi_dev').css({
          fill: "#FF6600"
        });
        $('#text_list_busi_dev').css({
          'text-decoration': "none"
        });
      });
      $('.desk.finance').on("mouseover", function() {
        $('#colorbox_list_finance').css({
          fill: "blue"
        });
        $('#text_list_finance').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.finance').on("mouseout", function() {
        $('#colorbox_list_finance').css({
          fill: "#00FF00"
        });
        $('#text_list_finance').css({
          'text-decoration': "none"
        });
      });
      $('.desk.acd').on("mouseover", function() {
        $('#colorbox_list_acd').css({
          fill: "blue"
        });
        $('#text_list_acd').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.acd').on("mouseout", function() {
        $('#colorbox_list_acd').css({
          fill: "gray"
        });
        $('#text_list_acd').css({
          'text-decoration': "none"
        });
      });
      $('.desk.vsa').on("mouseover", function() {
        $('#colorbox_list_vsa').css({
          fill: "blue"
        });
        $('#text_list_vsa').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.vsa').on("mouseout", function() {
        $('#colorbox_list_vsa').css({
          fill: "yellow"
        });
        $('#text_list_vsa').css({
          'text-decoration': "none"
        });
      });
      $('.desk.accounting').on("mouseover", function() {
        $('#colorbox_list_accounting').css({
          fill: "blue"
        });
        $('#text_list_accounting').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.accounting').on("mouseout", function() {
        $('#colorbox_list_accounting').css({
          fill: "#006600"
        });
        $('#text_list_accounting').css({
          'text-decoration': "none"
        });
      });
      $('.desk.ops').on("mouseover", function() {
        $('#colorbox_list_ops').css({
          fill: "blue"
        });
        $('#text_list_ops').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.ops').on("mouseout", function() {
        $('#colorbox_list_ops').css({
          fill: "tomato"
        });
        $('#text_list_ops').css({
          fill: "black"
        });
        $('#text_list_ops').css({
          'text-decoration': "none"
        });
      });
      $('.desk.tpa').on("mouseover", function() {
        $('#colorbox_list_tpa').css({
          fill: "blue"
        });
        $('#text_list_tpa').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.tpa').on("mouseout", function() {
        $('#colorbox_list_tpa').css({
          fill: "coral"
        });
        $('#text_list_tpa').css({
          'text-decoration': "none"
        });
      });
      $('.desk.mrkt_comm').on("mouseover", function() {
        $('#colorbox_list_mrkt_comm').css({
          fill: "blue"
        });
        $('#text_list_mrkt_comm').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.mrkt_comm').on("mouseover", function() {
        $('#colorbox_list_mrkt_comm').css({
          fill: "#3399FF"
        });
        $('#text_list_mrkt_comm').css({
          'text-decoration': "none"
        });
      });
      $('.desk.prvd_mgmt').on("mouseover", function() {
        $('#colorbox_list_prvd_mgmt').css({
          fill: "blue"
        });
        $('#text_list_prvd_mgmt').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.prvd_mgmt').on("mouseout", function() {
        $('#colorbox_list_prvd_mgmt').css({
          fill: "#00FFFF"
        });
        $('#text_list_prvd_mgmt').css({
          'text-decoration': "none"
        });
      });
      $('.desk.isa').on("mouseover", function() {
        $('#colorbox_list_isa').css({
          fill: "blue"
        });
        $('#text_list_isa').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.isa').on("mouseout", function() {
        $('#colorbox_list_isa').css({
          fill: "#FFFF33"
        });
        $('#text_list_isa').css({
          'text-decoration': "none"
        });
      });
      $('.desk.reception').on("mouseover", function() {
        $('#colorbox_list_reception').css({
          fill: "blue"
        });
        $('#text_list_reception').css({
          'text-decoration': "underline"
        });
      });
      $('.desk.reception').on("mouseover", function() {
        $('#colorbox_list_reception').css({
          fill: "#595959"
        });
        $('#text_list_reception').css({
          'text-decoration': "none"
        });
      });
    }); //end hovering over an individual location and corresponding map legend list item highlighting */

  });