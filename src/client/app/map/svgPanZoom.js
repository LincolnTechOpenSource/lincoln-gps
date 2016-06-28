/*
 * svgPanZoom.js
 * Matthew Vasseur
 * 06/28/16
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('PanZoom', PanZoom);

    /* @ngInject */
    function PanZoom() {
        var service = {
            map: null,

            init: init
        };

        return service;

        //------------------------------------------------//

        /* global svgPanZoom */
        function init(selector, options) {
            service.map = svgPanZoom(selector, options);
        }
    }
})();
/*----------------------------------------------------------------------------*/