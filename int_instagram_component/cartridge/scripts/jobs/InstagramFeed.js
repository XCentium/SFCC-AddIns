'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Logger = require('dw/system/Logger');
var Transaction = require('dw/system/Transaction');
var Site = require('dw/system/Site');
var InstagramService = require('~/cartridge/services/InstagramService');

module.exports = {
  getInstagramPosts: function() {
    var clientID = Site.current.getCustomPreferenceValue('instaAppID');
    var clientSecret = Site.current.getCustomPreferenceValue('instaClientSecret');
    var userid = Site.current.getCustomPreferenceValue('instaUserID');
    var longToken = Site.current.getCustomPreferenceValue('instaLongToken');
    var mediaFields = Site.current.getCustomPreferenceValue('instaMediaFields');
    var theDay;

    function getLongTermToken() {
      var newToken = new dw.util.HashMap();
      newToken.put('grant_type', 'ig_refresh_token');
      newToken.put('access_token', longToken);
      var response;

      var result = InstagramService.longTermTokenRefresh.call(newToken);
      if (result.isOk()) {
        response = result.object.access_token;
      } else {
        response = 'error';
        Logger.error('Instagram Error getting new token');
      }

      return response;
    }

    function getMedia(token) {
      var mediaArgs = new dw.util.HashMap();
      mediaArgs.put('fields', mediaFields);
      mediaArgs.put('access_token', token);
      mediaArgs.put('userid', userid);
      var response;
      var instagramPosts = InstagramService.getMedia.call(mediaArgs);

      if (instagramPosts.isOk()) {
        response = instagramPosts.object;
      } else {
        response = 'error';
        Logger.error('Instagram error getting media');
      }
      return response;
    }

    function isItMonday() {
      var date = new Date();
      var day = date.getDay();
      return day;
    }

    theDay = isItMonday();
    // if it's a monday, refresh the token
    if (theDay === 1) {
      longToken = getLongTermToken();
    }
    // otherwise, use the info to get update information
    var thePosts = getMedia(longToken);

    // write the posts to the Custom Object
    var currentPosts = CustomObjectMgr.getCustomObject('socialMedia','instagram');

    //if object is not there, create it
    if (!currentPosts){
        currentPosts = CustomObjectMgr.createCustomObject('socialMedia','instagram');
    }

    Transaction.wrap(function() {
      currentPosts.custom.feed = JSON.stringify(thePosts);
    });
  }
};
