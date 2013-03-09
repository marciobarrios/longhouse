require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        //bootstrap: 'vendor/bootstrap',
        looper: '../components/looper/src/looper'
    },
    shim: {
        looper: ['jquery']
    }
    /*,
    shim: {
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'jquery'
        }
    }*/
});

require(['app', 'jquery', 'looper'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);

    // dots nav in top slider
    //$(function($){
      $('#top-slider').on('shown', function(e){
        $('.looper-nav > li', this)
          .removeClass('active')
          .eq(e.relatedIndex)
            .addClass('active');
      });
    //});

    // Parallax effect when scrolling up
    /**
      * Creates the parallax effect.
      */
      function createParallaxEffect() {
        var parallaxElement = document.getElementsByTagName("header")[0];
        var parallaxClassName = "js-parallax";
        var parallaxEnabled = (
          parallaxElement.nodeType === 1 &&
          getStyle(document.body, "content", ":after").indexOf("parallax") >= 0 &&
          !hasClass(rootElement, parallaxClassName)
        );

        if ( !parallaxEnabled ) {
          return;
        }

        addClass(rootElement, parallaxClassName);

        var parallaxSpeed = 0.5;
        var parallaxTopClassName = parallaxClassName + "-alt";

        var parallaxLimitMax;
        var lastPositionY;

        var setTransform;
        var handleScrollY;
        var handleResize;

        if ( Modernizr.ios ) {
          setTransform = function(){};
        }
        else if ( Modernizr.qgraphicsview && Modernizr.csstransforms3d ) {
          setTransform = function(offset, scale) {
            parallaxElement.style[transformProperty] = "translate3d(0," + offset + "px,0) scale(" + scale + ")";
          };
        }
        else if ( Modernizr.qgraphicsview && Modernizr.csstransforms ) {
          setTransform = function(offset, scale) {
            parallaxElement.style[transformProperty] = "translateY(" + offset + "px) scale(" + scale + ")";
          };
        }
        else {
          setTransform = function(offset) {
            parallaxElement.style.backgroundPosition = "50% " + offset + "px";
          };
        }

        handleScrollY = function() {
          var positionY = parseInt(window.pageYOffset, 10);
          positionY = Math.min(parallaxLimitMax, positionY);

          if ( positionY !== lastPositionY ) {
            lastPositionY = positionY;

            if ( positionY > 0 ) {
              setTransform(positionY * parallaxSpeed, 1);
            }
            else {
              setTransform(positionY / -6, -1 * positionY / parallaxLimitMax + 1);
            }

            if ( positionY >= (parallaxLimitMax - 35) ) {
              addClass(rootElement, parallaxTopClassName);
            }
            else {
              removeClass(rootElement, parallaxTopClassName);
            }
          }
        };

        handleResize = function() {
          parallaxLimitMax = parallaxElement.offsetHeight || 440;
          lastPositionY += 999;
          handleScrollY();
        };

        handleResize();
        window.addEventListener("resizeend", handleResize, false);
        window.addEventListener("scroll", handleScrollY, false);
      }
});
