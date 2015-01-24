(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-button')
    .directive('paperButton', paperButton);

  paperButton.$inject = [];

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