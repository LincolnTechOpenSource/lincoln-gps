/**
 * core.module.js
 * 06/21/16
 */
(function() {
  'use strict';

    // Node Type Enumerations
    var NodeTypeEnum = {
        ERR: 0, // undefined node type (i.e., an error)
        EXIT: 1, // an exit (e.g., elevator, stairs)
        WALL: 2, // a wall (i.e., something that you cannot walk through)
        PATH: 3, // a walkway you could take (i.e., the floor)
        BROOM: 4, // a bathroom
        DESK: 5, // a desk, cubicle, or office
        CONF: 6, // a conference room
        FOOD: 7, // a location for food (e.g., kitchen, vending machine)
        COPY: 8, // a room/area with a copier/scanner
        JANITOR: 9, //janitor closet, storage room, etc

        // enumeration properties
        properties: {
            0: {
                name: 'error',
                value: 0,
                code: 'ERR'
            },
            1: {
                name: 'exit',
                value: 1,
                code: 'EXIT'
            },
            2: {
                name: 'wall',
                value: 2,
                code: 'WALL'
            },
            3: {
                name: 'path',
                value: 3,
                code: 'PATH'
            },
            4: {
                name: 'bathroom',
                value: 4,
                code: 'BROOM'
            },
            5: {
                name: 'desk',
                value: 5,
                code: 'DESK'
            },
            6: {
                name: 'conference',
                value: 6,
                code: 'CONF'
            },
            7: {
                name: 'food_lounge',
                value: 7,
                code: 'FOOD'
            },
            8: {
                name: 'copy_rm',
                value: 8,
                code: 'COPY'
            },
            9: {
                name: 'janitor_closet',
                value: 9,
                code: 'JANITOR'
            }
        }
    };

    // array of department classes and names
    var UNITS = (function() {
        return {
          DEPARTMENTS: DEPARTMENTS(),
          UTILITIES: UTILITIES(),
          ALL: ALL()
        };

        //------------------------------------

        // types that can be found in the employee directory
        function DEPARTMENTS() {
            return [
                {code: 'account-setup', name: 'Account Set-Up'},
                {code: 'accounting', name: 'Accounting'},
                {code: 'acd', name: 'Advisor Consulting Division'},
                {code: 'asset-mgmt', name: 'Asset Management'},
                {code: 'branch-dev', name: 'Branch Development'},
                {code: 'branch-serv', name: 'Branch Services'},
                {code: 'busi-dev', name: 'Business Development'},
                {code: 'compli-licens', name: 'Compliance and Licensing'},
                {code: 'doc-mgmt', name: 'Document Management'},
                {code: 'euc', name: 'End User Computing'},
                {code: 'exec-suite', name: 'Executive Offices'},
                {code: 'facilities', name: 'Facilites'},
                {code: 'finance', name: 'Finance'},
                {code: 'hr', name: 'Human Resources'},
                {code: 'isd', name: 'Information Services Division'},
                {code: 'im-r', name: 'Investment Management and Research'},
                {code: 'isa', name: 'Investor Services Advisor'},
                {code: 'mrkt-comm', name: 'Marketing and Communication'},
                {code: 'one-time-financials', name: 'One Time Financials'},
                {code: 'ops', name: 'Operations'},
                {code: 'prvd-mgmt', name: 'Provider Management'},
                {code: 'quality-cntrl', name: 'Quality Control'},
                {code: 'rdi', name: 'Research Development Implementation'},
                {code: 'reception', name: 'Reception'},
                {code: 'retire-serv', name: 'Retirement Services'},
                {code: 'tpa', name: 'Third Party Administrators'},
                {code: 'vsa', name: 'Virtual Service Associates'}
            ];
        }

        // the rest
        function UTILITIES() {
            return [
                {code: 'broom', name: 'Bathrooms'},
                {code: 'conf', name: 'Conference Rooms'},
                {code: 'copy-scan-rm', name: 'Copy Scan and Printing Rooms'},
                {code: 'elevator-exit', name: 'Elevator Exits'},
                {code: 'food', name: 'Lounge and Food'},
                {code: 'stairs-exit', name: 'Stairs Exits'},
            ];
        }

        function ALL() {
          return DEPARTMENTS().concat(UTILITIES());
        }

    })();

    angular
        .module('app.core')
        .constant('NodeTypeEnum', NodeTypeEnum)
        .constant('UNITS', UNITS);

})();