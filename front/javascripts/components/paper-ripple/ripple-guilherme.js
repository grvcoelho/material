(function($, window, document, undefined) {
  
  'use strict';

  /**
   * Define the name of the plugin
   */
  var ripple = 'ripple';


  /**
   * Get an instance of the plugin
   */
  var self = null;


  /**
   * Define the defaults of the plugin
   */
  var defaults = {
    toggleMode: 'click'
  };


  /**
   * Create the main function
   */
  function Ripple(element, options) {
    self = this;

    this.element = $(element);

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = ripple;

    this.init();
  }


  /**
   * Initialize the plugin
   */
  Ripple.prototype.init = function() {
    var $element = self.element;


    /**
     * Listen to when the user touched or clicked the element
     */
    $element.on('mousedown touchstart', function(event) {

      var $this = $(this);

      /**
       * Verify if the user is just touching on a device and return if so
       */
      if(self.isTouch() && event.type === 'mousedown') {
        return false;
      }


      /**
       * Get the ripple color
       */
      var rippleColor = self.getRippleColor($this);


      /**
       * Verify if the current element already has a ripple wrapper element and
       * creates if it doesn't
       */
      if(!($element.find('.ripple-wrapper').length)) {
        $element.append('<div class="ripple-wrapper"></div>');
      }


      /**
       * Find the ripple wrapper 
       */
      var $wrapper = $element.children('.ripple-wrapper');


      /**
       * Get relY and relX positions
       */
      var relY = self.getRelY($wrapper, event);
      var relX = self.getRelX($wrapper, event);


      /**
       * If relY and/or relX are false, return the event
       */
      if(!relY && !relX) {
        return;
      }


      /**
       * Create the ripple element
       */
      var $ripple = $('<div></div>');

      $ripple
        .addClass('ripple')
        .css({
          'left': relX,
          'top': relY,
          'background-color': rippleColor
        });


      /**
       * Append the ripple to the wrapper
       */
      $wrapper.append($ripple);


      /**
       * Make sure the ripple has the styles applied (ugly hack but it works)
       */
      (function() { return window.getComputedStyle($ripple[0]).opacity; })();


      /**
       * Turn on the ripple animation
       */
      self.rippleOn($this, $ripple);


      /**
       * Call the rippleEnd function when the transition 'on' ends
       */
      setTimeout(function() {
        self.rippleEnd($ripple);
      }, 500);


      /**
       * Detect when the user leaves the element
       */
      $this.on('mouseup mouseleave touchend', function() {
        $ripple.data('mousedown', 'off');

        if($ripple.data('animating') === 'off') {
          self.rippleOut($ripple);
        }
      });
    });
  };


  /**
   * Get the new size based on the element height/width and the ripple width
   */
  Ripple.prototype.getNewSize = function($element, $ripple) {
    return (Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth()) * 2.5;
  };


  /**
   * Get the relX
   */
  Ripple.prototype.getRelX = function($wrapper,  event) {
    var wrapperOffset = $wrapper.offset();

    if(!self.isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageX - wrapperOffset.left;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch 
       * position relative to the ripple wrapper
       */
      event = event.originalEvent;

      if(event.touches.length !== 1) {
        return event.touches[0].pageX - wrapperOffset.left;
      } 

      return false;
    }
  };


  /**
   * Get the relY
   */
  Ripple.prototype.getRelY = function($wrapper, event) {    
    var wrapperOffset = $wrapper.offset();

    if(!self.isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageY - wrapperOffset.top;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch 
       * position relative to the ripple wrapper
       */
      event = event.originalEvent;

      if(event.touches.length !== 1) {
        return event.touches[0].pageY - wrapperOffset.top;
      } 

      return false;
    }
  };


  /**
   * Get the ripple color
   */
  Ripple.prototype.getRippleColor = function($element) {

    var color = $element.data("ripple-color") ? $element.data('ripple-color') : window.getComputedStyle($element[0]).color;

    return color;
  };


  /**
   * Verify if the client browser has transistion support
   */
  Ripple.prototype.hasTransitionSupport = function() {
    var thisBody  = document.body || document.documentElement;
    var thisStyle = thisBody.style;

    var support = (
      thisStyle.transition !== undefined || 
      thisStyle.WebkitTransition !== undefined || 
      thisStyle.MozTransition !== undefined || 
      thisStyle.MsTransition !== undefined || 
      thisStyle.OTransition !== undefined
    );

    return support;
  };


  /**
   * Verify if the client is using a mobile device
   */
  Ripple.prototype.isTouch = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };


  /**
   * End the animation of the ripple
   */
  Ripple.prototype.rippleEnd = function($ripple) {
    $ripple.data('animating', 'off');

    if($ripple.data('mousedown') === 'off') {
      self.rippleOut($ripple);
    }
  };


  /**
   * Turn off the ripple effect
   */
  Ripple.prototype.rippleOut = function($ripple) {
    $ripple.off();

    if(self.hasTransitionSupport()) {
      $ripple.addClass('ripple-out');
    } else {
      $ripple.animate({'opacity': 0}, 100, function() {
        $ripple.trigger('transitionend');
      });
    }

    $ripple.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
      $ripple.remove();
    });
  };



  /**
   * Turn on the ripple effect
   */
  Ripple.prototype.rippleOn = function($element, $ripple) {
    var size = self.getNewSize($element, $ripple);

    if(self.hasTransitionSupport()) {
      $ripple
        .css({
          '-ms-transform': 'scale(' + size + ')',
          '-moz-transform': 'scale(' + size + ')',
          '-webkit-transform': 'scale(' + size + ')',
          'transform': 'scale(' + size + ')'
        })
        .addClass('ripple-on')
        .data('animating', 'on')
        .data('mousedown', 'on');
    } else {
      $ripple.animate({
        'width': Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        'height': Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        'margin-left': Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        'margin-top': Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        'opacity': 0.2
      }, 500, function() {
        $ripple.trigger('transitionend');
      });
    }
  };


  /**
   * Create the jquery plugin function
   */
  $.fn.ripple = function(options) {
    return this.each(function() {
      if(!$.data(this, 'plugin_' + ripple)) {
        $.data(this, 'plugin_' + ripple, new Ripple(this, options))
      }
    });
  };

})(jQuery, window, document);