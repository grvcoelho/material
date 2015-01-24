(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper', [
      'ngRoute',
      'ngTouch',

      'paper.components.paper-backdrop',
      'paper.components.paper-button',
      'paper.components.paper-dialog',
      'paper.components.paper-ripple'
    ]);

  
})(angular);