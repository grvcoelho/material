(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-dialog')
    .controller('paperDialogController', paperDialogController);

  paperDialogController.$inject = ['$scope', '$element', '$attrs', '$log', '$paperDialog'];

  /**
   * The paper dialog controller.
   * 
   * @ngdoc controller
   * @name  paperDialogController
   * @requires $scope
   * @requires $window
   * @requires $element
   * @requires $attrs
   * @requires $timeout
   * @requires $log
   */
  function paperDialogController($scope, $element, $attrs, $log, $paperDialog) {
    if(typeof $attrs.heading !== 'undefined') {
      $scope.heading = $attrs.heading;
    }

    if(typeof $attrs.id !== 'undefined') {
      $scope.id = $attrs.id;
    }      

    if(typeof $attrs.closeable !== 'undefined') {
      $scope.closeable = $attrs.closeable;
    }      

    $scope.open = false;
    $paperDialog.add($scope);

    $scope.closeDialog = function(target) {
      $log.info(target);
      $paperDialog.close(target);
    }
  }
  
})(angular);