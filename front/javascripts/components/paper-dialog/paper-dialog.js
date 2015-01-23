(function(angular, window, document, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-dialog', [])
    .controller('paperDialogController', paperDialogController)
    .directive('paperDialog', paperDialog)
    .directive('dialogToggle', dialogToggle)
    .service('$paperDialog', paperDialogService);

    paperDialogController.$inject = ['$scope', '$attrs', '$log', '$paperDialog'];

    dialogToggle.$inject = ['$paperDialog', '$log'];
    paperDialog.$inject = [];
    paperDialogService.$inject = ['$filter'];

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
    function paperDialogController($scope, $attrs, $log, $paperDialog) {
      if(typeof $attrs.heading !== 'undefined') {
        $scope.heading = $attrs.heading;
      }

      if(typeof $attrs.id !== 'undefined') {
        $scope.id = $attrs.id;
      }      

      $scope.open = false;

      $paperDialog.add($scope);
    }


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

 
    /**
     * The paper dialog directive.
     * Creates and opens a dialog.
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


    function paperDialogService($filter) {
      var _this = this;

      this.dialogs = [];

      this.add = add;
      this.open = open;

      function add(dialog) {
        _this.dialogs.push(dialog);
      }

      function open(target) {
        var dialog = _getDialog(target);
        
        if(dialog.open) {
          dialog.open = false;
        } else {
          dialog.open = true;
        }
      }

      function _getDialog(target) {
        return $filter('filter')(_this.dialogs, function (elem) {
          return elem.id === target;
        })[0];
      }
    }

  
})(angular, window, document);