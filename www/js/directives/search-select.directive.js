// search-select.directive.js (adapted from https://codepen.io/anon/pen/VjLYjW)

angular.module('ion-search-select.directive', [])
    .directive('ionSearchSelect', ['$ionicModal', '$ionicGesture', function($ionicModal, $ionicGesture) {
        return {
            restrict: 'E',
            scope: {
                options: "=",
                optionSelected: "=",
                saveCallback: "="
            },
            controller: function($scope, $element, $attrs) {
                $scope.searchSelect = {
                    title: $attrs.title || "Search",
                    keyProperty: $attrs.keyProperty,
                    valueProperty: $attrs.valueProperty,
                    templateUrl: 'templates/search-select.html',
                    option: null,
                    searchvalue: "",
                    enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true,
                    enableMapSelect: $attrs.enableMapSelect ? $attrs.enableMapSelect == "true" : false
                };

                $ionicGesture.on('tap', function(e) {
                    if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
                        $scope.searchSelect.option = ($scope.optionSelected ?
                            $scope.optionSelected[$scope.searchSelect.keyProperty] :
                            null);
                    }
                    else {
                        $scope.searchSelect.option = $scope.optionSelected;
                    }

                    // Open Modal from Template
                    $ionicModal.fromTemplateUrl($scope.searchSelect.templateUrl, {
                        scope: $scope,
                        focusFirstInput: true,
                    }).then(function(modal) {
                        $scope.modal = modal;
                        $scope.modal.show();
                    });
                }, $element);

                $scope.saveOption = function() {
                    if (!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
                        for (var i = 0; i < $scope.options.length; i++) {
                            var currentOption = $scope.options[i];
                            if (currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
                                $scope.optionSelected = currentOption;
                                break;
                            }
                        }
                    }
                    else {
                        $scope.optionSelected = $scope.searchSelect.option;
                    }
                    $scope.clearSearch();
                    $scope.closeModal();

                    // call back function after option save
                    if (!!$scope.saveCallback)
                        $scope.saveCallback();
                };

                $scope.selectOnMap = function() {
                    $scope.optionSelected = "FIND_ON_MAP";

                    $scope.clearSearch();
                    $scope.closeModal();
                };

                $scope.clearSearch = function() {
                    $scope.searchSelect.searchvalue = "";
                };

                $scope.closeModal = function() {
                    $scope.modal.remove();
                };

                $scope.$on('$destroy', function() {
                    if ($scope.modal) {
                        $scope.modal.remove();
                    }
                });
            }
        };
    }]);