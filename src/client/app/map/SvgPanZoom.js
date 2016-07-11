/*
 * SvgPanZoom.js
 * 06/28/16
 * implements https://github.com/ariutta/svg-pan-zoom
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    angular
        .module('app.map')
        .factory('SvgPanZoom', SvgPanZoom);

    /* @ngInject */
    function SvgPanZoom($timeout) {
        var service = {
            map: null,

            init: init
        };

        return service;

        //------------------------------------------------//

        /** initialize svg pan zoom */
        function init() {
            // Apply the script inject in the next tick of the event loop. This
            // will give AngularJS time to safely finish its compile and linking.
            return $timeout(initSync, 0, false);
        }

        function initSync(selector, options) {
            /* global svgPanZoom */
            service.map = svgPanZoom('#map', {
                zoomEnabled: true,
                minZoom: 0.5,
                maxZoom: 10,
                controlIconsEnabled: false,
                // preventMouseEventsDefault: false, // enable before pushing to mobile
                beforePan: beforePan
            });

            function beforePan(oldPan, newPan) {
                var gutterWidth = 75;
                var gutterHeight = 75;
                // Computed variables
                var sizes = service.map.getSizes();
                var leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
                var rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
                var topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
                var bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

                return {
                    x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
                    y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
                };
            }
        }
    }
})();
/*----------------------------------------------------------------------------*/
