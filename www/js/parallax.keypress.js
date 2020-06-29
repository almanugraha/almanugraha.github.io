(function ($) {
    "use strict";

/*=================================================
	Scroll Page on Keypress
==================================================*/

    jQuery("body").keydown(function (e) {
        if (e.keyCode == 39 && (pagemove < (total_num_pages - 1))) { // right
            pagemove++;
            HORILLAX.ANIM.instance.move(pagemove);

        } else if (e.keyCode == 37) { // left
            if (pagemove > 0) {
                pagemove--;
                HORILLAX.ANIM.instance.move(pagemove);
            }
        }
    });



})(jQuery);