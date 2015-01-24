(function(angular, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-backdrop')
    .controller('PaperBackdropController', PaperBackdropController);

  PaperBackdropController.$inject = ['$scope', '$attrs', '$paperBackdrop', '$log'];

  function PaperBackdropController($scope, $attrs, $paperBackdrop, $log) {
    $paperBackdrop.add($scope);

    $scope.test = function() {alert('he');}
  }
  
})(angular);