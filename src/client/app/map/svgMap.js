// svgMap.js

angular
    .module('app.map')
    .directive('svgMap', svgMap);

/* @ngInject */
function svgMap() {
    return {
        restrict: 'E',
        templateUrl: 'dynamic/map.svg',
    };
}
