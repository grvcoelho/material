(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper', [
      'ngRoute',
      'ngTouch',

      'paper.components.paper-button',
      'paper.components.paper-ripple',
      'paper.components.paper-dialog'
    ]);

  
})(angular);