'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the YouTube component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function(context) {
    var content = context.content;
    var type = content.dataType;
    var height = content.setHeight;
    var width = content.setWidth;
    var autoplay = content.isAutoplay;
    var loop = content.isLoop;
    var controls = content.isControls;
    var fullSize = content.isFullSize;

    var model = new HashMap();

    model.title = content.sectionTitle;
    model.subTitle = content.sectionSubtitle;
    model.type = type;

    var iframeOpen = '<iframe id="ytplayer" type="text/html" ';
    var iframeFullResponsive;
    if (fullSize == true){
        iframeFullResponsive = 'class="embed-responsive-item"';
    } 
    var iframeWidth = 'width="'+ width +'" ';
    var iframeHeight = 'height="'+ height +'" ';

    var iframeSrc = "https://www.youtube.com/embed";
    var iframeCore;

    if (autoplay){
        autoplay = 'autoplay=1&';
    } else {
        autoplay = 'autoplay=0&';
    }
    if (controls){
        controls = 'controls=1&';
    } else {
        controls = 'controls=0&';
    }
    if (loop){
        loop = 'loop=1"';
    } else {
        loop = 'loop=0"';
    }

    var iframeClose = ' frameborder="0"></iframe>';

    if (type == 'video') {
        iframeCore = '/'+content.videoID.trim()+'?';
    } else {
        iframeCore = '?listType=playlist&list='+content.playlistID.trim()+'&';
    }

    var videoDisplay = iframeOpen+iframeFullResponsive+iframeWidth+iframeHeight+' src="'+iframeSrc+iframeCore+autoplay+controls+loop+iframeClose;

    model.videos = videoDisplay;
    model.responsive = fullSize;

    return new Template('experience/components/commerce_assets/youtube').render(model).text;
};