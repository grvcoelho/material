(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-backdrop')
    .service('$paperBackdrop', paperBackdropService);

  paperBackdropService.$inject = ['$filter'];

  /**
   * The paper backdrop service.
   * 
   * @ngdoc service
   * @name  $paperBackdrop
   * @requires $filter
   */
  function paperBackdropService($filter) {
    var _this = this;

    this.backdrops = [];
    this.isActive = false;

    this.activate = function() {
      _this.backdrops[0].isActive = true;
    }

    this.deactivate = function() {
      _this.backdrops[0].isActive = false;
    }

    this.add = function(backdrop) {
      backdrop.isActive = false;
      _this.backdrops.push(backdrop);
    }
  }

  
})(angular);