'use strict';

/* eslint-disable prettier/prettier */

/**
 *
 *   Services to get access Youtube Data API
 *   https://developers.google.com/youtube/v3
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

var getVideo = LocalServiceRegistry.createService(
  'youtube.http.video.get', {
    createRequest: function createRequest(svc, args) {
      svc.setRequestMethod('GET');
      var baseUrl = svc.getURL();
      // GET https://www.googleapis.com/youtube/v3/videos?part=player&id=z1xBTQtJxdY&key=[YOUR_API_KEY] HTTP/1.1
      var URL = baseUrl + '/videos';
      svc.setURL(URL);
      svc.setRequestMethod('GET');
      setServiceParams(svc, args);
    },
    parseResponse: function parseResponse(svc, client) {
      Logger.debug('YouTube Data API: \n{0}', client.text);
      return JSON.parse(client.text);
    },
    mockCall: function mockCall() {
      return {
        statusCode: 200,
        statusMessage: 'Success',
        text: {
            "kind": "youtube#videoListResponse",
            "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/JW0AuQ5JF8MHOes784a2LFSUKWo\"",
            "pageInfo": {
             "totalResults": 1,
             "resultsPerPage": 1
            },
            "items": [
             {
              "kind": "youtube#video",
              "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/1Nnh2pa4mrMGlniocOR-yeux-mE\"",
              "id": "z1xBTQtJxdY",
              "player": {
               "embedHtml": "\u003ciframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/z1xBTQtJxdY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
              }
             }
            ]
           }
      };
    }
  }
);

var getPlaylist = LocalServiceRegistry.createService(
    'youtube.http.playlist.get', {
      createRequest: function createRequest(svc, args) {
        svc.setRequestMethod('GET');
        var baseUrl = svc.getURL();
        // GET https://www.googleapis.com/youtube/v3/playlists?part=player&channelId=UCSTGHqzR1Q9yAVbiS3dAFHg&key=[YOUR_API_KEY] HTTP/1.1
        var URL = baseUrl + '/playlists';
        svc.setURL(URL);
        svc.setRequestMethod('GET');
        setServiceParams(svc, args);
      },
      parseResponse: function parseResponse(svc, client) {
        Logger.debug('Youtube Data API: \n{0}', client.text);
        return JSON.parse(client.text);
      },
      mockCall: function mockCall() {
        return {
          statusCode: 200,
          statusMessage: 'Success',
          text: {
                "kind": "youtube#playlistListResponse",
                "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/JNVqdH5t29PyShcBjhuy2BG9fj0\"",
                "nextPageToken": "CAUQAA",
                "pageInfo": {
                 "totalResults": 14,
                 "resultsPerPage": 5
                },
                "items": [
                 {
                  "kind": "youtube#playlist",
                  "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/XsW2feIKroTJpIP6gjDAGJclqwI\"",
                  "id": "PLplkSVBuCUkQbkzTRpBTtjsoQEPMdjOIP",
                  "player": {
                   "embedHtml": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLplkSVBuCUkQbkzTRpBTtjsoQEPMdjOIP\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
                  }
                 },
                 {
                  "kind": "youtube#playlist",
                  "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/uwGdm2_zaa9D3KwBx5fAX0VXCn8\"",
                  "id": "PLplkSVBuCUkSD92CJWJdZ6OKUoIyH0xJt",
                  "player": {
                   "embedHtml": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLplkSVBuCUkSD92CJWJdZ6OKUoIyH0xJt\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
                  }
                 },
                 {
                  "kind": "youtube#playlist",
                  "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/uZalEELyZ9E7UIV2krHqTxEu3hI\"",
                  "id": "PLplkSVBuCUkSeIz8-gZqVdNaZq523y2GQ",
                  "player": {
                   "embedHtml": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLplkSVBuCUkSeIz8-gZqVdNaZq523y2GQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
                  }
                 },
                 {
                  "kind": "youtube#playlist",
                  "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/obgJsxg76J2Pc5wGF3LfOXh7ON8\"",
                  "id": "PLplkSVBuCUkRwiz2QC9sIzSeAZVvi81M8",
                  "player": {
                   "embedHtml": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLplkSVBuCUkRwiz2QC9sIzSeAZVvi81M8\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
                  }
                 },
                 {
                  "kind": "youtube#playlist",
                  "etag": "\"tnVOtk4NeGU6nDncDTE5m9SmuHc/9iwciikMmG35kr1VhblMKdkk4R4\"",
                  "id": "PLplkSVBuCUkQJsOB1GXVVS662QJCcY2op",
                  "player": {
                   "embedHtml": "\u003ciframe width=\"640\" height=\"360\" src=\"http://www.youtube.com/embed/videoseries?list=PLplkSVBuCUkQJsOB1GXVVS662QJCcY2op\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
                  }
                 }
                ]
            }
        };
      }
    }
  );

exports.getPlaylist = getPlaylist;
exports.getVideo = getVideo;
