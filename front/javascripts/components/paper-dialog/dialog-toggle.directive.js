(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-dialog')
    .directive('dialogToggle', dialogToggle);

  dialogToggle.$inject = ['$paperDialog', '$log'];

  /**
   * The dialog toggle directive.
   * Toggle a specified dialog.
   * 
   * @ngdoc directive
   * @name dialogToggle
   */
   
  function dialogToggle($paperDialog, $log) {
    return {
      restrict: 'EA',
      link: link
    };

    function link($scope, $element, $attrs) {
      var target = $attrs.dialogToggle;

      $element.on('click', function() {
        $paperDialog.open(target);
      });
    }
  }
      
})(angular);