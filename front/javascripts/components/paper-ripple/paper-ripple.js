(function(angular, window, document, undefined) {
  
  'use strict';

  angular
    .module('paper.components.paper-ripple', [])
    .controller('PaperRippleController', PaperRippleController)
    .directive('paperRipple', paperRipple);

    PaperRippleController.$inject = ['$scope', '$window', '$element', '$attrs', '$timeout', '$log'];
    paperRipple.$inject = [];

    /**
     * The paper ripple controller.
     * 
     * @ngdoc controller
     * @name  PaperRippleController
     * @requires $scope
     * @requires $window
     * @requires $element
     * @requires $attrs
     * @requires $timeout
     * @requires $log
     */
    function PaperRippleController($scope, $window, $element, $attrs, $timeout, $log) {

      /**
       * All the active ripples
       * @type {Array}
       */
      $scope.ripples = [];  


      if(typeof $attrs.color !== 'undefined') {
        /**
         * The color of the ripple.
         * @type {string}
         */
        $scope.color = $attrs.color;
      }

      $scope.rippleStart = rippleStart;
      $scope.rippleEnd   = rippleEnd;
      $scope.rippleOut   = rippleOut;


      /**
       * Starts the ripple effect.
       *
       * @param {object} event
       */
      $scope.rippleStart = function(event) {
        /**
         * The ripple wrapper
         * @type {object}
         */
        var wrapper = $element[0];


        /**
         * The offset of the wrapper
         * @type {object}
         */
        var offset = {
          top: wrapper.offsetParent.offsetTop,
          left: wrapper.offsetParent.offsetLeft
        };


        /**
         * The X coordinate the ripple must start on.
         * @type {float}
         */
        var relX = _getRelX(offset, event);


        /**
         * The Y coordinate the ripple must start on.
         * @type {float}
         */
        var relY = _getRelY(offset, event);


        /**
         * The ripple color. 
         * @type {string}
         */
        var rippleColor = _getRippleColor(wrapper);


        /**
         * The new ripple
         * @type {object}
         */
        var ripple = $scope.currentRipple = {
          color: rippleColor,
          left: relX + 'px',
          top: relY + 'px'
        };


        /** 
         * Pushes the new ripple to the $scope.ripples array
         */
        $scope.ripples.push(ripple);


        /**
         * The size of the ripple
         * @type {float}
         */
        var size = _getNewSize(wrapper, $scope.currentRipple);

        $timeout(function() {
          $scope.currentRipple.transform = 'scale(' + size + ')'; 
          $scope.currentRipple.starting = true;
          $scope.currentRipple.mousedown = true;
          $scope.currentRipple.animating = true;
        }, 0);

        $timeout(function() {
          ripple.animating = false;
          $scope.rippleEnd(ripple);
        }, 500);
      };


      /**
       * Ends the ripple effect and destroys the ripple.
       *
       * @param {object} ripple - The ripple to be destroyed.
       */
      $scope.rippleEnd = function(ripple) {
        if(!ripple.mousedown && !ripple.animating) {
          ripple.ending = true;
          ripple.starting = false;

          $timeout(function() {
            ripple.ending = false;
            $scope.ripples.shift();
          }, 100);
        }
      };


      /**
       * Informs when the mouse is up.
       */
      $scope.rippleOut = function() {
        $scope.currentRipple.mousedown = false;
        $scope.rippleEnd($scope.currentRipple);
      };


      /**
       * Gets the color for the ripple from either the scope or the parent element.
       * @param  wrapper - The ripple wrapper.
       * @return {string} - The ripple color (a hexadecimal or rgba).
       */
      function _getRippleColor(wrapper) {
        return $scope.color || $window.getComputedStyle(wrapper.parentNode).color;
      }


      /**
       * Calculates the proportion the ripple must scale up.
       *
       * @param  wrapper - The ripple wrapper.
       * @return {float} - The proportion the ripple must scale up.
       */
      function _getNewSize(wrapper) {
        return Math.max(wrapper.offsetWidth, wrapper.offsetHeight) / 20 * 2.5;
      }


      /**
       * Gets the X coordinate the ripple effect must start on.
       *
       * @param  {object} offset - The offset of the ripple wrapper.
       * @param  {object} event - The properties of the mouse event.
       * @return {float} - The X coordinate.
       */
      function _getRelX(offset, event) {
        return event.pageX - offset.left;
      }


      /**
       * Gets the Y coordinate the ripple effect must start on.
       * 
       * @param  {object} offset - The offset of the ripple wrapper.
       * @param  {object} event - The properties of the mouse event.
       * @return {float} - The X coordinate.
       */
      function _getRelY(offset, event) {
        return event.pageY - offset.top;
      }


      /**
       * Checks if the client device is a touchscreen device.
       * @return {boolean}
       */
      function _isTouch() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
    }


    /**
     * The paper ripple directive.
     * Creates a ripple effect when the user interacts with the element.
     * 
     * @ngdoc directive
     * @name paperRipple
     */
    function paperRipple() {
      return {
        restrict: 'EA',
        controller: 'PaperRippleController',
        templateUrl: 'templates/paper-ripple/paper-ripple.html',
        replace: true,
        transclude: true,
        scope: {}
      };
    }
  
})(angular, window, document);