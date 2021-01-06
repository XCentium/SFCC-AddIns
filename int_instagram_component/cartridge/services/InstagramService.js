'use strict';

/* eslint-disable prettier/prettier */

/**
 *
 *   Services to get access Instagram API
 *   https://developers.facebook.com/docs/instagram-basic-display-api
 *
 */

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');

function setServiceParams(service, params) {
  var paramsIter = params.keySet().iterator();
  while (paramsIter.hasNext()) {
    var key = paramsIter.next();
    service.addParam(key, params.get(key));
  }

  return service;
}

var longTermTokenRefresh = LocalServiceRegistry.createService(
  'instagram.http.token.get', {
    createRequest: function createRequest(svc, args) {
      svc.setRequestMethod('GET');

      var baseUrl = svc.getURL();
      // https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={long-lived-access-token}
      var URL = baseUrl + '/refresh_access_token';
      svc.setURL(URL);
      svc.setRequestMethod('GET');
      setServiceParams(svc, args);
    },

    parseResponse: function parseResponse(svc, client) {
      Logger.debug('Instagram Basic API response: \n{0}', client.text);
      return JSON.parse(client.text);
    },

    mockCall: function mockCall() {
      return {
        statusCode: 200,
        statusMessage: 'Success',
        text: {
          access_token: 'IGQVJYclp6WXBFaThGQUhCMGhhRGxvbFpZAWGZAHanF4cU9saXk4eE5Lc2tEYUU1QkdVc0U1MjFFcGdNTDh5cGRKalh5NzJ1czA3RjFTOGRVUllfMzN4ejdHb1dtdFAzR09VbTVkbko0QnhRcmpyWEZAGZAgZDZD',
          token_type: 'bearer',
          expires_in: 5183944 // Number of seconds until token expires
        }
      };
    }
  }
);

var getMedia = LocalServiceRegistry.createService(
  'instagram.http.media.get', {
    createRequest: function createRequest(svc, args) {
      svc.setRequestMethod('GET');
      var baseUrl = svc.getURL();
      // https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp,permalink&access_token=IGQVJYUlB1dmhNc043SWEwV3JablB6S3BDMERzemtxSUU2akVDd2lMU3pldjBDeVpzNnZAMdjdtQVNaX2pzZAFNBY3BVUnpoNWNrR0dqT09FMXdkNHVTQlM2RkdGLWdGLXBkcnpKcHJn'
      var URL = baseUrl + '/me/media?fields='+args.fields+'&access_token='+args.access_token;
      svc.setURL(URL);
      svc.setRequestMethod('GET');
    },
    parseResponse: function parseResponse(svc, client) {
      Logger.debug('Instagram Basic API media: \n{0}', client.text);
      return JSON.parse(client.text);
    },
    mockCall: function mockCall() {
      return {
        statusCode: 200,
        statusMessage: 'Success',
        text: {
          "data": [
            {
              "id": "17895695668004550",
              "media_url": "https://scontent.xx.fbcdn.net/v/t51.2885-15/90660001_217571069493684_8184600196645805035_n.jpg?_nc_cat=108&_nc_sid=8ae9d6&_nc_ohc=KITzJ94j4pUAX9caUX5&_nc_ht=scontent.xx&oh=7a8da016bb3238e214a103d115b89d7f&oe=5EA269A5",
              "timestamp": "2020-03-25T20:36:05+0000",
              "permalink": "https://www.instagram.com/p/B-K5VeIBltl/"
            }
          ],
          "paging": {
            "cursors": {
              "after": "QVFIUmdOU0dtVTZARc3JoaDZAaemJaamE2R3RLb3cwT2RzVldyWDFvVkdGTy1aRG5kU0FTTlhsWVFxV2Q4OHJrTDJpdGtmU2tGczNHMzNKWk9DN1ZAnM3dIbDBB",
              "before": "QVFIUnlqSDFCQ0RuY3oxSFNNakZASTFJmdEJVRGFqSHNYRV85bGd2X1JCYkVlaXpiVGNuaUpRLThlOTlfRnctMGVlUk5GemtPZAC1vdWRRSVZAocW45MDd1cXRn"
            },
            "next": "https://graph.facebook.com"
          }
        }
      };
    }
  }
);

exports.longTermTokenRefresh = longTermTokenRefresh;
exports.getMedia = getMedia;
