/**
 * Functionality specific to parallax template.
 *
 */
(function ($) {
    "use strict";


    //Hide navbar on menu item click (on smartphones)
    var navMain = $("#main-navbar");
    navMain.on("click", "a", null, function () {
        if (navMain.hasClass("in")) {
            navMain.collapse('hide');
        }
    });


    //Enable tab navigation for input fields
    $(document).keydown(function (event) {
        if (event.keyCode == 9) {
            event.preventDefault();
        }
    });

    var inputs = $('input, textarea, select, button'),
        inputTo;
    inputs.on('keydown', function (e) {
        if (e.keyCode == 9 || e.which == 9) {
            e.preventDefault();
            if (e.shiftKey) {
                inputTo = inputs.get(inputs.index(this) - 1);
            } else {
                inputTo = inputs.get(inputs.index(this) + 1);
            }
            if (inputTo) {
                inputTo.focus();
            } else {
                inputs[0].focus();
            }
        }
    });

    //Prevent href jump
    $('#main-navbar .menu-item > a').on("click", function (e) {
        e.preventDefault();
    });

    //Add parallax IDs to menu items
    $('#parallax-menu .menu-item > a').attr('id', function (i) {
        return 'sec' + (i + 1);
    });

    //Start parallax animations on click
    $('#parallax-menu .menu-item > a').attr('onclick', function (i) {
        return 'HORILLAX.ANIM.instance.move(' + (i) + ');';
    });

    //bxslider settings
    var chevron_right = '<i class="fa fa-chevron-right"></i>';
    var chevron_left = '<i class="fa fa-chevron-left"></i>';

    var teamslider = $('.template-parallax .team').bxSlider({
        slideWidth: 240,
        minSlides: 1,
        maxSlides: 5,
        slideMargin: 16,
        infiniteLoop: false,
        pager: false,
        nextText: chevron_right,
        prevText: chevron_left,
        hideControlOnEnd: true
    });

    var blogslider = $('.blogpage').bxSlider({
        slideWidth: 492,
        slideMargin: 16,
        minSlides: 1,
        maxSlides: 5,
        infiniteLoop: false,
        pager: false,
        nextText: chevron_right,
        prevText: chevron_left,
        hideControlOnEnd: true
    });

    var portslider = $('.parallax-portfolio .slider').bxSlider({
        pagerCustom: '#pager',
        nextText: chevron_right,
        prevText: chevron_left,
        mode: 'fade'
    });

    //Resize function call on document.ready
    resize();

    //Resize function call on window.resize
    $(window).resize(resize);

    //Start resize function
    function resize() {

        //If responsiveness enabled, reload slider when window width and height is > 480
        if (responsive) {

            if ($(window).width() > 480 && $(window).height() > 480) {

                if ($('.team').length) {
                    teamslider.reloadSlider();
                }
                if ($('.blogpage').length) {
                    blogslider.reloadSlider();
                }
                if ($('.parallax-portfolio .slider').length) {
                    portslider.reloadSlider();
                }
            }

            //If window width and height is < 480, just destroy slider and show normal content
            else {

                if ($('.team').length) {
                    teamslider.destroySlider();
                }
                if ($('.blogpage').length) {
                    blogslider.destroySlider();
                }
                if ($('.parallax-portfolio .slider').length) {
                    portslider.destroySlider();
                }

                //Page height - height of footer and header
                $('.page-contents').css({
                    'height': $(window).height() - 210 + 'px'
                });

            }
        }

        //Add Bootstrap classes to bxslider next/prev buttons	
        $('.bx-next, .bx-prev').addClass('btn btn-default');
        $('.bx-controls-direction').addClass('btn-group');
        $('.parallax-blog .bx-controls-direction, .parallax-aboutus .bx-controls-direction').addClass('btn-group-expand');

    } //End resize function

    //Add tooltip to readmore buttons
    $('.link').tooltip();

})(jQuery);

//on window load

jQuery(window).load(function () {

    //Fade out preloader
    jQuery('div.loading-page').fadeOut('slow');
    //add equalheights to about section image and description div
    jQuery('.image-height').equalHeightColumns();
});