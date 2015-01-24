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

      if(_isTouch()) {
        $element.on('click', _openDialog);
      } else {
        $element.on('mousedown', _openDialog);
      }

      function _openDialog() {
        $paperDialog.open(target);
      }

      function _isTouch() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
    }
  }
      
})(angular);