(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-dialog')
    .service('$paperDialog', paperDialogService);

  paperDialogService.$inject = ['$filter'];

  /**
   * The paper dialog service.
   * 
   * @ngdoc service
   * @name  $paperDialog
   * @requires $filter
   */
  function paperDialogService($filter) {
    var _this = this;

    this.dialogs = [];

    this.add = add;
    this.open = open;
    this.close = close;
    this.closeAll = closeAll;

    function add(dialog) {
      _this.dialogs.push(dialog);
    }

    function open(target) {
      var dialog = _getDialog(target);

      _this.closeAll();

      if(!dialog.open) {
        dialog.open = true;
      }
    }

    function close(target) {
      var dialog = _getDialog(target);

      if(dialog.open) {
        dialog.open = false;
      }

    }

    function closeAll() {
      var openDialogs = $filter('filter')(_this.dialogs, function (elem) {
        return elem.open === true;
      });

      angular.forEach(openDialogs, function(dialog) {
        dialog.open = false;
      });
    }

    function _getDialog(target) {
      return $filter('filter')(_this.dialogs, function (elem) {
        return elem.id === target;
      })[0];
    }
  }

  
})(angular);