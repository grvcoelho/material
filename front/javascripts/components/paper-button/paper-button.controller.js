(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-button')
    .controller('PaperButtonController', PaperButtonController);

  PaperButtonController.$inject = ['$scope', '$element', '$attrs', '$log'];

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
  
})(angular);