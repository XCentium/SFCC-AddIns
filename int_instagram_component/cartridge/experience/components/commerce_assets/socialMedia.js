'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

/**
 * Render logic for the storefront.shopTheLook component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function(context) {
  var content = context.content;

  var instaFeed = CustomObjectMgr.getCustomObject('socialMedia', 'instagram');

  var feed = JSON.parse(instaFeed.custom.feed);
  var feedData = feed.data;
  var feedDisplay = [];

  Object.keys(feedData).forEach(function(key) {
    feedDisplay.push({
      img: feedData[key].media_url,
      caption: feedData[key].caption,
      media_type: feedData[key].media_type,
      link: feedData[key].permalink
    });
  });

  var model = new HashMap();

  model.instafeed = feedDisplay;
  model.title = content.instaTitle || null;

  return new Template('experience/components/commerce_assets/socialMedia').render(model).text;
};
