/*=================================================
	Scroll Page on Mousewheel
==================================================*/
var lastAnimation = 0;
var quietPeriod = 100;


function unscrollPage() {
    jQuery('body').unbind('mousewheel');
}


function scrollThis(event, delta, deltaX, deltaY) {

    if(scrollEnb){
        var timeNow = new Date().getTime();

        deltaOfInterest = deltaY;

        if (deltaOfInterest == 0) {
            return;
        }

        if (timeNow - lastAnimation < quietPeriod + transitionSpeed) {
            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
            lastAnimation = timeNow;
            if (pagemove < (total_num_pages - 1)) {
                pagemove++;
                HORILLAX.ANIM.instance.move(pagemove);
            }

        } else {
            lastAnimation = timeNow;
            if (pagemove > 0) {
                pagemove--;
                HORILLAX.ANIM.instance.move(pagemove);
            }
        }

        setTimeout(() => {
            if(pagemove == 6){
                $('.nav-animation').fadeOut();
            }else{
                $('.nav-animation').fadeIn();
            }
        }, 500);

          

    }
}

function scrollPage() {
    jQuery('body').bind('mousewheel', scrollThis);
}

(function ($) {
    "use strict";


    $(".nano.has-scrollbar, .content-box").on("hover", function (e) {

        if (e.type == "mouseenter") {
            unscrollPage();
        } else {
            scrollPage();
        }
    });

    scrollPage();

})(jQuery);