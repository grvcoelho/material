(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-dialog')
    .directive('paperDialog', paperDialog);

  paperDialog.$inject = [];

  /**
   * The paper dialog directive.
   * Creates and opens a dialog.
   * 
   * @ngdoc directive
   * @name paperDialog
   */
  function paperDialog() {
    return {
      restrict: 'EA',
      controller: 'paperDialogController',
      templateUrl: 'templates/paper-dialog/paper-dialog.html',
      replace: true,
      transclude: true,
      scope: {}
    };
  }
  
})(angular);