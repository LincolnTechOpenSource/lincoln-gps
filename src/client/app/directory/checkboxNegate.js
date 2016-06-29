/**
 * checkboxNegate.js
 **/
(function() {
    'use strict';

    angular
        .module('app.directory')
        .directive('negate', negate);

    function negate() {
        return {
            require: 'ngModel',
            link: function(scope, element, attribute, ngModel) {
                ngModel.$isEmpty = function(value) {
                    return !!value;
                };

                // ngModel.$formatters.push(formatter);
                ngModel.$formatters.unshift(formatter);

                function formatter(value) {
                    return !value;
                }

                ngModel.$parsers.unshift(function(value) {
                    return !value;
                });
            }
        };
    }
})();