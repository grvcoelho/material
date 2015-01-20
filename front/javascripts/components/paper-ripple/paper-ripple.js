(function(angular, window, document, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-ripple', [])
    .controller('PaperRippleController', PaperRippleController)
    .directive('paperRipple', paperRipple);

    PaperRippleController.$inject = ['$scope', '$document', '$element', '$attrs', '$timeout', '$log'];
    paperRipple.$inject = [];

    function PaperRippleController($scope, $document, $element, $attrs, $timeout, $log) {

      $scope.ripples = [];  

      $scope.rippleStart = function(event) {
        var wrapper = $element.children('.ripple-wrapper')[0];

        var offset = {
          top: wrapper.offsetParent.offsetTop,
          left: wrapper.offsetParent.offsetLeft
        };

        var relX = _getRelX(offset, event);
        var relY = _getRelY(offset, event);

        $scope.currentRipple = {
          color: 'black',
          left: relX + 'px',
          top: relY + 'px'
        };

        $scope.ripples.push($scope.currentRipple);

        var size = _getNewSize(wrapper, $scope.currentRipple);

        $timeout(function() {
          $scope.currentRipple.transform = 'scale(' + size + ')'; 
          $scope.currentRipple.animating = true;
          $scope.currentRipple.mousedown = true;
        }, 0);

      };

      $scope.rippleEnd = function() {
        $timeout(function() {
          $scope.currentRipple.ending = true;
          $scope.currentRipple.animating = false;
        },500);

        $timeout(function() {
          $scope.currentRipple.ending = false;
          $scope.ripples.splice($scope.currentRipple, 1);
        }, 600);
      };

      function _getRelX(offset, event) {
        return event.pageX - offset.left;
      }

      function _getRelY(offset, event) {
        return event.pageY - offset.top;
      }

      function _getNewSize(wrapper) {
        return Math.max(wrapper.offsetWidth, wrapper.offsetHeight) / 20 * 2.5;
      }


      function _isTouch() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }

    }

    function paperRipple() {
      return {
        restrict: 'EA',
        controller: 'PaperRippleController',
        templateUrl: 'templates/paper-ripple/paper-ripple.html',
        transclude: true,
        scope: {}
      };
    }
  
})(angular, window, document);