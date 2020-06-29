//Check transform support
function has3d() {
    var el = document.createElement('p'),
        has3d,
        transforms = {
            'transform': 'transform'
        };

    document.body.insertBefore(el, null);
    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = "translate3d(1px,1px,1px)";
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }
    document.body.removeChild(el);
    return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

HORILLAX.ANIM = function () {
    this.init();
};
HORILLAX.ANIM.prototype = {
    maxWidth: 0,
    maxHeight: 0,
    currentScene: 0,
    newScene: 0,
    animateScreens: false,
    scenesAnimated: 0,
    parallaxElements: [],
    init: function () {
        HORILLAX.ANIM.instance = this;
        this.maxWidth = jQuery(document).width();
        this.maxHeight = jQuery(document).height();
        this.createScenes();
        this.mouseMoveParallax();
        jQuery(window).resize(this.reposition);
    },
    createScenes: function () {
    	//Resize Parallax Elements if responsive
        if (responsive) {
            var screenProp = this.maxWidth / 1920;
        } else {
            var screenProp = 1;
        }
        for (var i = 0; i < items.length; i++) {
            if (jQuery(items[i].name).length == 0) {
                jQuery("#parallax-container").append("<div id='" + items[i].name.substring(1, (items[i].name.length)) + "' class='parallaxItem'></div>");
            }
            if (items[i].image) {
                var imgWidth = Math.round(items[i].sizes.w * screenProp);
                var imgHeight = Math.round(items[i].sizes.h * screenProp);

                jQuery(items[i].name).append("<img src='" + items[i].image + "' width='" + imgWidth + "' height='" + imgHeight + "' />");
            }
            if (items[i].tPos) {
                jQuery(items[i].name).css("top", (items[i].tPos) * screenProp);
            }
        }
        this.repositionClips();
    },
    reposition: function () {
        HORILLAX.ANIM.instance.repositionClips();
    },
    repositionClips: function () {
        this.maxWidth = jQuery(document).width();
        this.maxHeight = jQuery(document).height();
        if (responsive) {
            var screenProp = this.maxWidth / 1920;
        } else {
            var screenProp = 1;
        }
        for (var i = 0; i < items.length; i++) {
            var curItem = jQuery(items[i].name);
            if (items[i].image) {
                var imgWidth = Math.round(items[i].sizes.w * screenProp);
                var imgHeight = Math.round(items[i].sizes.h * screenProp);
                jQuery(items[i].name + " img").attr({
                    width: imgWidth,
                    height: imgHeight
                });
                if (items[i].parallaxScene) {
                    jQuery(items[i].name).attr("depth", Math.round(items[i].mouseSpeed * screenProp));
                    this.parallaxElements.push(jQuery(items[i].name));
                }
                if (items[i].bPos) {
                    jQuery(items[i].name).css({
                        "bottom": Math.round(items[i].bPos * screenProp)
                    });
                } else if (items[i].tPos) {
                    jQuery(items[i].name).css("top", (Math.round(items[i].tPos * screenProp)) + 50);
                }
            }
            if (items[i].screenPos[this.currentScene] == "center") {
                if (!items[i].tPos) {
                    curItem.css({
                        "top": (((this.maxHeight + items[i].offsetV) / 2) - (curItem.height() / 2)) - 50
                    });
                }
                curItem.css({
                    "left": (this.maxWidth / 2) - (jQuery(curItem).width() / 2),
                    "z-index": items[i].stackOrder
                });
            } else {
                curItem.css({
                    "left": items[i].screenPos[this.currentScene],
                    "z-index": items[i].stackOrder
                });
            }
        }
    },
    move: function (sec) {
        HORILLAX.ANIM.instance.moveToScreen(sec);
    },
    moveToScreen: function (targetScreen) {
        if (!this.animateScreens) {
            this.newScene = targetScreen;
            if (this.newScene != this.currentScene) {

                this.animateScreens = true;
                this.removeParallaxAnimation();
                for (var i = 0; i < items.length; i++) {
                    var curItem = jQuery(items[i].name);
                    curItem.css("margin-left", "0px");
                    if (!(items[i].visibility[this.newScene] == false && items[i].visibility[this.currentScene] == false)) {
                        if (!items[i].tPos) {
                            curItem.css({
                                "top": (((this.maxHeight + items[i].offsetV) / 2) - (curItem.height() / 2)) - 50
                            });
                        }
                        if (items[i].screenPos[this.newScene] == "center") {
                            var leftPos = (this.maxWidth / 2) - (jQuery(curItem).width() / 2);
                            curItem.animate({
                                "left": leftPos
                            }, {
                                duration: transitionSpeed,
                                complete: this.countClips
                            });
                        } else {
                            curItem.animate({
                                left: (parseInt(items[i].screenPos[this.newScene]) / 100) * this.maxWidth
                            }, {
                                duration: transitionSpeed,
                                complete: this.countClips
                            });
                        }
                    } else {
                        curItem.css({
                            "left": items[i].screenPos[this.newScene]
                        });
                        this.animationQueue();
                    }
                }
            }
        }
    },
    countClips: function () {
        HORILLAX.ANIM.instance.animationQueue();
    },
    animationQueue: function () {


        for (var i = 0; i < items.length; i++) {
            var curItem = jQuery(items[i].name);
            this.animateScreens = false;
        }

        this.scenesAnimated++;
        if (this.scenesAnimated >= items.length) {
            this.currentScene = this.newScene;
            this.mouseMoveParallax();
            this.scenesAnimated = 0;
            this.repositionClips();

            jQuery("#masthead #parallax-menu li.menu-item").removeClass("current_page_item");
            jQuery("#masthead #parallax-menu li.menu-item").eq(this.currentScene).addClass("current_page_item");
            pagemove = (this.currentScene);

            this.animateScreens = false;
        }
    },
    mouseMoveParallax: function () {
        jQuery("#parallax-container").mousemove(function (e) {
            var mousePos = e.pageX;
            var mouseProp = ((((mousePos * 100) / HORILLAX.ANIM.instance.maxWidth) - 50)) * -1;

            for (var i = 0; i < HORILLAX.ANIM.instance.parallaxElements.length; i++) {
                var finalPosition = (mouseProp * HORILLAX.ANIM.instance.parallaxElements[i].attr("depth") * 5) / 50;

                if (has3d()) {
                    HORILLAX.ANIM.instance.parallaxElements[i].css("transform", "translate3d(" + finalPosition + "px,0,0)");
                } else {
                    HORILLAX.ANIM.instance.parallaxElements[i].css("margin-left", finalPosition + "px");
                }
            }
        });
    },
    removeParallaxAnimation: function () {
        jQuery("#parallax-container").unbind('mousemove');
    },
};