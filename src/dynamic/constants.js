/**
 * constants.js
 * 07/20/16
 */
(function() {
  'use strict';

    // Node Type Enumerations
    var NODE_TYPES = {
        ERR: 0, // undefined node type (i.e., an error)
        EXIT: 1, // an exit (e.g., elevator, stairs)
        WALL: 2, // a wall (i.e., something that you cannot walk through)
        PATH: 3, // a walkway you could take (i.e., the floor)
        BROOM: 4, // a bathroom
        EMPL: 5, // an employee location (desk, cubicle, or office)
        CONF: 6, // a conference room
        FOOD: 7, // a location for food (e.g., kitchen, vending machine)
        COPY: 8, // a room/area with a copier/scanner
        JANITOR: 9, //janitor closet, storage room, etc
    };

    // set of departments - i.e. employee and utility codes and names
    var DEPARTMENTS = (function() {
        return {
          EMPLOYEE: EMPLOYEE(),
          UTILITIES: UTILITIES(),
          ALL: ALL()
        };

        //------------------------------------

        // departments that can be found in the employee directory
        function EMPLOYEE() {
            return [
                {depCode: 'account-setup', name: 'Account Set-Up', color: '#fff'},
                {depCode: 'accounting', name: 'Accounting', color:'#006600'},
                {depCode: 'acd', name: 'Advisor Consulting Division', color:'#808080'},
                {depCode: 'asset-mgmt', name: 'Asset Management', color:'#90EE90'},
                {depCode: 'branch-dev', name: 'Branch Development', color:'#FF0000'},
                {depCode: 'branch-serv', name: 'Branch Services', color:'#33CC33'},
                {depCode: 'busi-dev', name: 'Business Development', color:'#FF6600'},
                {depCode: 'compli-licens', name: 'Compliance and Licensing', color:'#FFFF99'},
                {depCode: 'doc-mgmt', name: 'Document Management', color:'#CC5200'},
                {depCode: 'euc', name: 'End User Computing', color:'#5CD65C'},
                {depCode: 'exec-suite', name: 'Executive Offices', color:'#D3D3D3'},
                {depCode: 'facilities', name: 'Facilites', color:'#DB4DFF'},
                {depCode: 'finance', name: 'Finance', color:'#00FF00'},
                {depCode: 'hr', name: 'Human Resources', color:'#CCCC00'},
                {depCode: 'im-r', name: 'Investment Management and Research', color:'#FFC0CB'},
                {depCode: 'isa', name: 'Investor Services Advisor', color:'#FFFF33'},
                {depCode: 'isd', name: 'Information Services Division', color:'#3377FF'},
                {depCode: 'mrkt-comm', name: 'Marketing and Communication', color:'#3399FF'},
                {depCode: 'one-time-financials', name: 'One Time Financials', color:'#F4A460'},
                {depCode: 'ops', name: 'Operations', color:'#FF6347'},
                {depCode: 'prvd-mgmt', name: 'Provider Management', color:'#00FFFF'},
                {depCode: 'quality-cntrl', name: 'Quality Control', color:'#EE82EE'},
                {depCode: 'rdi', name: 'Research Development Implementation', color:'#FF3333'},
                {depCode: 'reception', name: 'Reception', color:'#595959'},
                {depCode: 'retire-serv', name: 'Retirement Services', color:'#990066'},
                {depCode: 'tpa', name: 'Third Party Administrators', color:'#FF7F50'},
                {depCode: 'vsa', name: 'Virtual Service Associates', color:'#FFFF00'}
            ];
        }

        // the rest
        function UTILITIES() {
            return [
                {depCode: 'broom', name: 'Bathrooms', color:'#787878'},
                {depCode: 'conf', name: 'Conference Rooms', color:'#ADD8E6'},
                {depCode: 'copy-scan-rm', name: 'Copy Scan and Printing Rooms', color:'#1AD1FF'},
                {depCode: 'elevator-exit', name: 'Elevator Exits', color:'#FF9988'},
                {depCode: 'food', name: 'Lounge and Food', color:'#D3D3D3'},
                {depCode: 'stairs-exit', name: 'Stairs Exits', color:'#FF9988'},
            ];
        }

        function ALL() {
          return EMPLOYEE().concat(UTILITIES());
        }
    })();

    // set of available titles
    var TITLES = [
        {titleCode: 'vp', name: 'Vice President'},
        {titleCode: 'exec', name: 'Executive Director'},
        {titleCode: 'md', name: 'Managing Director'},
        {titleCode: 'int', name: 'Intern'},
        {titleCode: 'ana', name: 'Analyst'},
        {titleCode: 'ass', name: 'Associate'},
        {titleCode: 'dev', name: 'Software Developer'},
        {titleCode: 'pres', name: 'President'}
    ];

    // set of allowed filters (key is the class to filter)
    var DEFAULT_FILTERS = {
        'broom': {
            'disp': true,
            'dispName': 'Bathrooms'
        },
        'conf': {
            'disp': true,
            'dispName': 'Conference Rooms'
        },
        'cubicle': {
            'disp': true,
            'dispName': 'Cubicles'
        },
        'desk': {
            'disp': true,
            'dispName': 'Desks'
        },
        'food': {
            'disp': true,
            'dispName': 'Food & Vending Locations'
        },
        'mbroom': {
            'disp': true,
            'dispName': 'Men\'s Bathrooms'
        },
        'office': {
            'disp': true,
            'dispName': 'Offices'
        },
        'wbroom': {
            'disp': true,
            'dispName': 'Women\'s Bathrooms'
        }
    };

    angular
        .module('dynamic')
        .constant('NODE_TYPES', NODE_TYPES)
        .constant('DEPARTMENTS', DEPARTMENTS)
        .constant('TITLES', TITLES)
        .constant('DEFAULT_FILTERS', DEFAULT_FILTERS);

})();