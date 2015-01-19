(function(angular, window, document, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-ripple', [])
    .controller('PaperRippleController', PaperRippleController)
    .directive('paperRipple', paperRipple);

    PaperRippleController.$inject = ['$scope', '$document', '$element', '$attrs', '$log'];
    paperRipple.$inject = [];

    function PaperRippleController($scope, $document, $element, $attrs, $log) {

      var wrapper = $element;
      $log.info(wrapper);

      function isTouch() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }

      $scope.test = function() {
        $log.info(isTouch());
      }

    }

    function paperRipple() {
      return {
        restrict: 'EA',
        controller: 'PaperRippleController',
        templateUrl: 'templates/paper-ripple/paper-ripple.html',
        transclude: true,
        scope: {}
      };
    }
  
})(angular, window, document);