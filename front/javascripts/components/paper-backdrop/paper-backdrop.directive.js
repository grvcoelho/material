(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-backdrop')
    .directive('paperBackdrop', paperBackdrop);

  paperBackdrop.$inject = [];

  function paperBackdrop() {
    return {
      restrict: 'EA',
      controller: 'PaperBackdropController',
      templateUrl: 'templates/paper-backdrop/paper-backdrop.html',
      replace: true,
      transclude: true,
      scope: {}
    };
  }
  
})(angular);