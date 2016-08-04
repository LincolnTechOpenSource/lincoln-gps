// svgMap.js

angular
    .module('app.map')
    .directive('svgMap', svgMap);

/* @ngInject */
function svgMap($ionicGesture, $localStorage, $timeout, SvgPanZoom, DEPARTMENTS) {
    return {
        restrict: 'E',
        templateUrl: 'office/map.svg',
        link: function(scope) {
            scope.vm.deps = DEPARTMENTS.ALL; // all of the departments in the legend
            scope.vm.legendHover = legendHover;

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

            // filter map upon first load
            $('#svg #map .loc').removeClass('filter-out'); // remove old filter

            // filter each preference that has display false
            var filters = $localStorage.prefs.filters;
            for (var filter in filters) {
                if (filters.hasOwnProperty(filter)) {
                    if (!filters[filter].disp) {
                        $('#svg #map .loc.' + filter).addClass('filter-out');
                    }
                }
            }
        }
    };

    //---------------------------------------

    /** hover functions for the legend (mouseenter and mouseleave)
     * attach hover element to each legend component so that hovering over text
     * makes all corresponding locations highlight
     */
    function legendHover(ev) {
        var code = $(ev.currentTarget).data('code');

        $('.loc.' + code + ':not(.filter-out)').toggleClass('hilite');
        $('.dep-list .' + code + ' .dep-list-colorbox').toggleClass('hilite');
        $('.dep-list .' + code + ' .dep-list-text').toggleClass('normal-text');
    }

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
