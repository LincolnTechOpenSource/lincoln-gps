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
                {depCode: 'account-setup', name: 'Account Set-Up'},
                {depCode: 'accounting', name: 'Accounting'},
                {depCode: 'acd', name: 'Advisor Consulting Division'},
                {depCode: 'asset-mgmt', name: 'Asset Management'},
                {depCode: 'branch-dev', name: 'Branch Development'},
                {depCode: 'branch-serv', name: 'Branch Services'},
                {depCode: 'busi-dev', name: 'Business Development'},
                {depCode: 'compli-licens', name: 'Compliance and Licensing'},
                {depCode: 'doc-mgmt', name: 'Document Management'},
                {depCode: 'euc', name: 'End User Computing'},
                {depCode: 'exec-suite', name: 'Executive Offices'},
                {depCode: 'facilities', name: 'Facilites'},
                {depCode: 'finance', name: 'Finance'},
                {depCode: 'hr', name: 'Human Resources'},
                {depCode: 'isd', name: 'Information Services Division'},
                {depCode: 'im-r', name: 'Investment Management and Research'},
                {depCode: 'isa', name: 'Investor Services Advisor'},
                {depCode: 'mrkt-comm', name: 'Marketing and Communication'},
                {depCode: 'one-time-financials', name: 'One Time Financials'},
                {depCode: 'ops', name: 'Operations'},
                {depCode: 'prvd-mgmt', name: 'Provider Management'},
                {depCode: 'quality-cntrl', name: 'Quality Control'},
                {depCode: 'rdi', name: 'Research Development Implementation'},
                {depCode: 'reception', name: 'Reception'},
                {depCode: 'retire-serv', name: 'Retirement Services'},
                {depCode: 'tpa', name: 'Third Party Administrators'},
                {depCode: 'vsa', name: 'Virtual Service Associates'}
            ];
        }

        // the rest
        function UTILITIES() {
            return [
                {depCode: 'broom', name: 'Bathrooms'},
                {depCode: 'conf', name: 'Conference Rooms'},
                {depCode: 'copy-scan-rm', name: 'Copy Scan and Printing Rooms'},
                {depCode: 'elevator-exit', name: 'Elevator Exits'},
                {depCode: 'food', name: 'Lounge and Food'},
                {depCode: 'stairs-exit', name: 'Stairs Exits'},
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