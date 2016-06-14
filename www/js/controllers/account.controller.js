/* account.controller.js */

angular.module('account.controller', [])
    .controller('AccountCtrl', function($scope, $rootScope) {

        $scope.resetToDefault = function() {
            for (var filter in $rootScope.filters) {
                $rootScope.filters[filter].disp = true;
            }
        };

         // Hover highlights for map legend department list
       $( document ).ready(function() {
          $('#text_list_branch_dev').on("mouseover", function() {
              $('.desk.office.branch_dev, .desk.cubicle.branch_dev, #colorbox_list_branch_dev').css({ fill: "blue" });
          });
          $('#text_list_branch_dev').on("mouseout", function() {
              $('.desk.office.branch_dev, .desk.cubicle.branch_dev, #colorbox_list_branch_dev').css({ fill: "red" });
          });

          $('#text_list_imr').on("mouseover", function() {
            $('.desk.office.im_r, .desk.cubicle.im_r, #colorbox_list_imr').css({ fill: "blue" });
          });
          $('#text_list_imr').on("mouseout", function() {
            $('.desk.office.im_r, .desk.cubicle.im_r, #colorbox_list_imr').css({fill: "pink"});
          });
          $('#text_list_busi_dev').on("mouseover", function() {
            $('.desk.office.busi_dev, .desk.cubicle.busi_dev, #colorbox_list_busi_dev').css({ fill: "blue" });
          });
          $('#text_list_busi_dev').on("mouseout", function() {
            $('.desk.office.busi_dev, .desk.cubicle.busi_dev, #colorbox_list_busi_dev').css({fill: "#FF6600"});
          });
          $('#text_list_finance').on("mouseover", function() {
            $('.desk.office.finance, .desk.cubicle.finance, #colorbox_list_finance').css({ fill: "blue" });
          });
          $('#text_list_finance').on("mouseout", function() {
            $('.desk.office.finance, .desk.cubicle.finance, #colorbox_list_finance').css({ fill: "#00FF00" });
          });
          $('#text_list_acd').on("mouseover", function() {
            $('.desk.office.acd, .desk.cubicle.acd, #colorbox_list_acd').css({ fill: "blue" });
          });
          $('#text_list_acd').on("mouseout", function() {
            $('.desk.office.acd, .desk.cubicle.acd, #colorbox_list_acd').css({ fill: "gray" });
          });
          $('#text_list_vsa').on("mouseover", function() {
            $('.desk.office.vsa, .desk.cubicle.vsa, #colorbox_list_vsa').css({ fill: "blue" });
          });
          $('#text_list_vsa').on("mouseout", function() {
            $('.desk.office.vsa, .desk.cubicle.vsa, #colorbox_list_vsa').css({ fill: "yellow" });
          });
          $('#text_list_accounting').on("mouseover", function() {
            $('.desk.office.accounting, .desk.cubicle.accounting, #colorbox_list_accounting').css({ fill: "blue" });
          });
          $('#text_list_accounting').on("mouseout", function() {
            $('.desk.office.accounting, .desk.cubicle.accounting, #colorbox_list_accounting').css({ fill: "#006600" });
          });
          $('#text_list_operations').on("mouseover", function() {
            $('.desk.office.ops, .desk.cubicle.ops, #colorbox_list_operations').css({ fill: "blue" });
          });
          $('#text_list_operations').on("mouseout", function() {
            $('.desk.office.ops, .desk.cubicle.ops, #colorbox_list_operations').css({ fill: "tomato" });
          });
          $('#text_list_tpa').on("mouseover", function() {
            $('.desk.office.tpa, .desk.cubicle.tpa, #colorbox_list_tpa').css({ fill: "blue" });
          });
          $('#text_list_tpa').on("mouseout", function() {
            $('.desk.office.tpa, .desk.cubicle.tpa, #colorbox_list_tpa').css({ fill: "coral" });
          });
          $('#text_list_mrkt_comm').on("mouseover", function() {
            $('.desk.office.mrkt_comm, .desk.cubicle.mrkt_comm, #colorbox_list_mrkt_comm').css({ fill: "blue" });
          });
          $('#text_list_mrkt_comm').on("mouseout", function() {
            $('.desk.office.mrkt_comm, .desk.cubicle.mrkt_comm, #colorbox_list_mrkt_comm').css({ fill: "#3399FF" });
          });
          $('#text_list_prvd_mgmt').on("mouseover", function() {
            $('.desk.office.prvd_mgmt, .desk.cubicle.prvd_mgmt, #colorbox_list_prvd_mgmt').css({ fill: "blue" });
          });
          $('#text_list_prvd_mgmt').on("mouseout", function() {
            $('.desk.office.prvd_mgmt, .desk.cubicle.prvd_mgmt, #colorbox_list_prvd_mgmt').css({ fill: "#00FFFF" });
          });
          $('#text_list_isa').on("mouseover", function() {
            $('.desk.office.isa, .desk.cubicle.isa, #colorbox_list_isa').css({ fill: "blue" });
          });
          $('#text_list_isa').on("mouseout", function() {
            $('.desk.office.isa, .desk.cubicle.isa, #colorbox_list_isa').css({ fill: "#FFFF33" });
          });
          $('#text_list_retire_serv').on("mouseover", function() {
            $('.desk.office.retire_serv, .desk.cubicle.retire_serv, #colorbox_list_retire_serv').css({ fill: "blue" });
          });
          $('#text_list_retire_serv').on("mouseout", function() {
            $('.desk.office.retire_serv, .desk.cubicle.retire_serv, #colorbox_list_retire_serv').css({ fill: "#990066" });
          });
          $('#text_list_quality_cntrl').on("mouseover", function() {
            $('.desk.office.quality_cntrl, .desk.cubicle.quality_cntrl, #colorbox_list_quality_cntrl').css({ fill: "blue" });
          });
          $('#text_list_quality_cntrl').on("mouseout", function() {
            $('.desk.office.quality_cntrl, .desk.cubicle.quality_cntrl, #colorbox_list_quality_cntrl').css({ fill: "violet" });
          });
          $('#text_list_asset_mgmt').on("mouseover", function() {
            $('.desk.office.asset_mgmt, .desk.cubicle.asset_mgmt, #colorbox_list_asset_mgmt').css({ fill: "blue" });
          });
          $('#text_list_asset_mgmt').on("mouseout", function() {
            $('.desk.office.asset_mgmt, .desk.cubicle.asset_mgmt, #colorbox_list_asset_mgmt').css({ fill: "lightgreen" });
          });
          $('#text_list_one_time_financials').on("mouseover", function() {
            $('.desk.office.one_time_financials, .desk.cubicle.one_time_financials, #colorbox_list_one_time_financials').css({ fill: "blue" });
          });
          $('#text_list_one_time_financials').on("mouseout", function() {
            $('.desk.office.one_time_financials, .desk.cubicle.one_time_financials, #colorbox_list_one_time_financials').css({ fill: "sandybrown" });
          });
          $('#text_list_conf').on("mouseover", function() {
            $('.desk.conf, .desk.office.conf, .desk.cubicle.conf, #colorbox_list_conf').css({ fill: "blue" });
          });
          $('#text_list_conf').on("mouseout", function() {
            $('.desk.conf, .desk.office.conf, .desk.cubicle.conf, #colorbox_list_conf').css({ fill: "lightblue" });
          });
          $('#text_list_hr').on("mouseover", function() {
            $('.desk.office.hr, .desk.cubicle.hr, #colorbox_list_hr').css({ fill: "blue" });
          });
          $('#text_list_hr').on("mouseout", function() {
            $('.desk.office.hr, .desk.cubicle.hr, #colorbox_list_hr').css({ fill: "#cccc00" });
          });
          $('#text_list_doc_mgmt').on("mouseover", function() {
            $('.desk.office.doc_mgmt, .desk.cubicle.doc_mgmt, #colorbox_list_doc_mgmt').css({ fill: "blue" });
          });
          $('#text_list_doc_mgmt').on("mouseout", function() {
            $('.desk.office.doc_mgmt, .desk.cubicle.doc_mgmt, #colorbox_list_doc_mgmt').css({ fill: "#cc5200" });
          });
          $('#text_list_branch_serv').on("mouseover", function() {
            $('.desk.office.branch_serv, .desk.cubicle.branch_serv, #colorbox_list_branch_serv').css({ fill: "blue" });
          });
          $('#text_list_branch_serv').on("mouseout", function() {
            $('.desk.office.branch_serv, .desk.cubicle.branch_serv, #colorbox_list_branch_serv').css({ fill: "#33cc33" });
          });
          $('#text_list_account_setup').on("mouseover", function() {
            $('.desk.office.account_setup, .desk.cubicle.account_setup, #colorbox_list_account_setup').css({ fill: "blue" });
          });
          $('#text_list_account_setup').on("mouseout", function() {
            $('.desk.office.account_setup, .desk.cubicle.account_setup, #colorbox_list_account_setup').css({ fill: "#ff8080" });
          });
          $('#text_list_compli_licens').on("mouseover", function() {
            $('.desk.office.compli_licens, .desk.cubicle.compli_licens, #colorbox_list_compli_licens').css({ fill: "blue" });
          });
          $('#text_list_compli_licens').on("mouseout", function() {
            $('.desk.office.compli_licens, .desk.cubicle.compli_licens, #colorbox_list_compli_licens').css({ fill: "#ffff99" });
          });
          $('#text_list_euc').on("mouseover", function() {
            $('.desk.office.euc, .desk.cubicle.euc, #colorbox_list_euc').css({ fill: "blue" });
          });
          $('#text_list_euc').on("mouseout", function() {
            $('.desk.office.euc, .desk.cubicle.euc, #colorbox_list_euc').css({ fill: " #5cd65c" });
          });
          $('#text_list_rdi').on("mouseover", function() {
            $('.desk.office.rdi, .desk.cubicle.rdi, #colorbox_list_rdi').css({ fill: "blue" });
          });
          $('#text_list_rdi').on("mouseout", function() {
            $('.desk.office.rdi, .desk.cubicle.rdi, #colorbox_list_rdi').css({ fill: "#ff3333" });
          });
          $('#text_list_isd').on("mouseover", function() {
            $('.desk.office.isd, .desk.cubicle.isd, #colorbox_list_isd').css({ fill: "blue" });
          });
          $('#text_list_isd').on("mouseout", function() {
            $('.desk.office.isd, .desk.cubicle.isd, #colorbox_list_isd').css({ fill: "#3377ff" });
          });
          $('#text_list_break_area').on("mouseover", function() {
            $('.break_area, #colorbox_list_break_area').css({ fill: "blue" });
          });
          $('#text_list_break_area').on("mouseout", function() {
            $('.break_area, #colorbox_list_break_area').css({ fill: "#FF6633" });
          });
          $('#text_list_kitchen').on("mouseover", function() {
            $('.kitchen, #colorbox_list_kitchen').css({ fill: "blue" });
          });
          $('#text_list_kitchen').on("mouseout", function() {
            $('.kitchen, #colorbox_list_kitchen').css({ fill: "lightgray" });
          });
          $('#text_list_stairs_exit').on("mouseover", function() {
            $('.stairs_exit, #colorbox_list_stairs_exit').css({ fill: "blue" });
          });
          $('#text_list_stairs_exit').on("mouseout", function() {
            $('.stairs_exit, #colorbox_list_stairs_exit').css({ fill: "#ff9988" });
          });
          $('#text_list_elevator_exit').on("mouseover", function() {
            $('.elevator_exit, #colorbox_list_elevator_exit').css({ fill: "blue" });
          });
          $('#text_list_elevator_exit').on("mouseout", function() {
            $('.elevator_exit, #colorbox_list_elevator_exit').css({ fill: "#ff9988" });
          });
          $('#text_list_reception').on("mouseover", function() {
            $('.reception, #colorbox_list_reception').css({ fill: "blue" });
          });
          $('#text_list_reception').on("mouseout", function() {
            $('.reception, #colorbox_list_reception').css({ fill: "#595959" });
          });
        });
    });