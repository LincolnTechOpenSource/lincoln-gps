// svgMap.js

angular
    .module('app.map')
    .directive('svgMap', svgMap);

/* @ngInject */
function svgMap($ionicGesture, SvgPanZoom, UNITS) {
    return {
        restrict: 'E',
        templateUrl: 'dynamic/map.svg',
        link: function(scope) {
            scope.vm.deps = [
                UNITS.ALL.slice(0, 14),
                UNITS.ALL.slice(14)
            ];

            // map.svg must have ID = 'map'
            if ($('#svg svg').attr('id') !== 'map') {
                throw new Error('the ID of map.svg must be "map"');
            }

            // enable pinch to zoom (for mobile)
            $ionicGesture.on('pinch', function(ev) {
                SvgPanZoom.map.zoom(SvgPanZoom.map.getZoom() * ev.gesture.scale);
            }, $('#map'));

            // attach hover element to each loc component so that hovering over location
            // makes the corresponding legend item highlight
            for (var i = 0; i < UNITS.ALL.length; i++) {
                $('.loc:not(.filter-out).' + UNITS.ALL[i].depCode).hover(
                    batchToggleClass(['.dep-list .' + UNITS.ALL[i].depCode + ' .dep-list-colorbox',
                        '.dep-list .' + UNITS.ALL[i].depCode + ' .dep-list-text'
                    ], ['hilite', 'normal-text']));
            }

            // initialize svg pan zoom
            SvgPanZoom.init();

            //---------------------------------------

            /** batchToggleClass: toggles the @classes of the specified @selectors
             *  toggles the corresponding class of an array of selectors */
            function batchToggleClass(selectors, classes) {
                return function() {
                    console.assert(selectors.length === classes.length, 'Invalid Call to batchToggleClass');
                    for (var i = 0; i < selectors.length; i++) {
                        $(selectors[i]).toggleClass(classes[i]);
                    }
                };
            }
        }
    };
}
