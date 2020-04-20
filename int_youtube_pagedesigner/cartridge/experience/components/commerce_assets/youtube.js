'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var YouTubeService = require('~/cartridge/services/youtubeService');
var Site = require('dw/system/Site');

/**
 * Render logic for the YouTube component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function(context) {
    var content = context.content;
    var type = content.dataType;
    var model = new HashMap();

    var apiKey = Site.current.getCustomPreferenceValue('youtubeApiKey');

    model.title = content.sectionTitle;
    model.subtitle = content.sectionSubtitle;
    model.type = type;

    var args = new dw.util.HashMap();
    args.put('part', 'player');
    args.put('key', apiKey);
    var response;
    var returnData;

    if (type == 'video') {
        args.put('id', content.videoID);
        returnData = YouTubeService.getVideo.call(args);
    } else {
        args.put('channelID', content.channelID);
        returnData = YouTubeService.getPlaylist.call(args);
    }

    if (returnData.isOk()) {
        response = returnData.object;
    } else {
        response = 'error';
        Logger.error('Error calling service');
        return;
    }

    var videoItems = response.items;
    var videoDisplay = [];

    Object.keys(videoItems).forEach(function(key) {
        videoDisplay.push({
            video: videoItems[key].player.embedHtml
        });
    });

    model.videos = videoDisplay;

    return new Template('experience/components/commerce_assets/youtube').render(model).text;
};