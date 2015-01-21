(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-button', [])
    .controller('PaperButtonController', PaperButtonController)
    .directive('paperButton', paperButton);

    PaperButtonController.$inject = ['$scope', '$element', '$attrs', '$log'];
    paperButton.$inject = [];

    function PaperButtonController($scope, $element, $attrs, $log) {
      if(typeof $attrs.raised !== 'undefined') {
        $scope.raised = $attrs.raised || true;
      }

      if(typeof $attrs.flat !== 'undefined') {
        $scope.flat = $attrs.flat || true;
      }

      if(typeof $attrs.hover !== 'undefined') {
        $scope.hover = $attrs.hover || true;
      }

      if(typeof $attrs.noink !== 'undefined') {
        $scope.noink = $attrs.noink || true;
      }

      if(typeof $attrs.color !== 'undefined') {
        $scope.color = $attrs.color;
      }
    }

    function paperButton() {
      return {
        restrict: 'EA',
        controller: 'PaperButtonController',
        templateUrl: 'templates/paper-button/paper-button.html',
        replace: true,
        transclude: true,
        scope: {}
      };
    }
  
})(angular);