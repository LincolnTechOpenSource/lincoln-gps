// svgMap.js

angular
    .module('app.map')
    .directive('svgMap', svgMap);

/* @ngInject */
function svgMap($ionicGesture, SvgPanZoom, DEPARTMENTS, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'dynamic/map.svg',
        link: function(scope) {
            scope.vm.deps = DEPARTMENTS.ALL; // all of the departments in the legend

            // map.svg must have ID = 'map'
            if ($('#svg svg').attr('id') !== 'map') {
                throw new Error('the ID of map.svg must be "map"');
            }

            // enable pinch to zoom (for mobile)
            $ionicGesture.on('pinch', function(ev) {
                SvgPanZoom.map.zoom(SvgPanZoom.map.getZoom() * ev.gesture.scale);
            }, $('#map'));


            for (var i = 0; i < DEPARTMENTS.ALL.length; i++) {
                // attach hover element to each loc component so that hovering over location
                // makes the corresponding legend item highlight
                $('.loc:not(.filter-out).' + DEPARTMENTS.ALL[i].depCode).hover(
                    batchToggleClass(['.dep-list .' + DEPARTMENTS.ALL[i].depCode + ' .dep-list-colorbox',
                        '.dep-list .' + DEPARTMENTS.ALL[i].depCode + ' .dep-list-text'
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
