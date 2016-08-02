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
                // {depCode: 'account-setup', name: 'Account Set-Up'},
                // {depCode: 'accounting', name: 'Accounting'},
                // {depCode: 'acd', name: 'Advisor Consulting Division'},
                // {depCode: 'asset-mgmt', name: 'Asset Management'},
                {depCode: 'branch-dev', name: 'Branch Development'},
                // {depCode: 'branch-serv', name: 'Branch Services'},
                // {depCode: 'busi-dev', name: 'Business Development'},
                {depCode: 'compliance', name: 'Compliance and Licensing'},
                // {depCode: 'doc-mgmt', name: 'Document Management'},
                {depCode: 'euc', name: 'End User Computing'},
                // {depCode: 'exec-suite', name: 'Executive Offices'},
                // {depCode: 'facilities', name: 'Facilites'},
                // {depCode: 'finance', name: 'Finance'},
                {depCode: 'hr', name: 'Human Resources'},
                {depCode: 'im-r', name: 'Investment Management and Research'},
                // {depCode: 'isa', name: 'Investor Services Advisor'},
                {depCode: 'isd', name: 'Information Services Division'},
                // {depCode: 'mrkt-comm', name: 'Marketing and Communication'},
                // {depCode: 'one-time-financials', name: 'One Time Financials'},
                {depCode: 'ops', name: 'Operations'},
                // {depCode: 'prvd-mgmt', name: 'Provider Management'},
                // {depCode: 'quality-cntrl', name: 'Quality Control'},
                // {depCode: 'rdi', name: 'Research Development Implementation'},
                // {depCode: 'reception', name: 'Reception'},
                // {depCode: 'retire-serv', name: 'Retirement Services'},
                // {depCode: 'tpa', name: 'Third Party Administrators'},
                // {depCode: 'vsa', name: 'Virtual Service Associates'},
            ];
        }

        // the rest
        function UTILITIES() {
            return [
                {depCode: 'broom', name: 'Bathrooms'},
                {depCode: 'conf', name: 'Conference Rooms'},
                // {depCode: 'copy-scan-rm', name: 'Copy Scan and Printing Rooms'},
                {depCode: 'elevator-exit', name: 'Elevator Exits'},
                {depCode: 'food', name: 'Lounge and Food'},
                {depCode: 'stairs-exit', name: 'Stairs Exits'},
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
    var FILTERS = {
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
        .module('office')
        .constant('NODE_TYPES', NODE_TYPES)
        .constant('DEPARTMENTS', DEPARTMENTS)
        .constant('TITLES', TITLES)
        .constant('FILTERS', FILTERS)
        .constant('GRAPH_URL', 'data/graph.json') // url to graph data
        .constant('LOC_URL', 'data/locations.json'); // url to locations data
        // Replace with your own firebase credentials
        // .constant('FIREBASE_CONFIG', {
        //     apiKey: 'AIzaSyBJmytcwYLNjfjPp4beCPewJ6XKE7mRYJs',
        //     authDomain: 'lincoln-gps.firebaseapp.com',
        //     databaseURL: 'https://lincoln-gps.firebaseio.com',
        //     storageBucket: 'lincoln-gps.appspot.com',
        // });

})();