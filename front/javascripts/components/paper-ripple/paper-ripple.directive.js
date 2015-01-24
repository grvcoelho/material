(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-ripple')
    .directive('paperRipple', paperRipple);

  paperRipple.$inject = [];

  /**
   * The paper ripple directive.
   * Creates a ripple effect when the user interacts with the element.
   * 
   * @ngdoc directive
   * @name paperRipple
   */
  function paperRipple() {
    return {
      restrict: 'EA',
      controller: 'PaperRippleController',
      templateUrl: 'templates/paper-ripple/paper-ripple.html',
      replace: true,
      transclude: true,
      scope: {}
    };
  }
  
})(angular);