// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// var Webcam = require('./webcam.js');
var type;

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

$(function () {
  $('#fileform').on('submit', uploadFiles); 
});

function displayShapShot () {
  document.getElementById('my_camera').innerHTML = '<img src="'+data_uri+'"/>';
}
/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles (event) {
  event.preventDefault(); // Prevent the default form post

  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile (event) {
  var content = event.target.result;
  var toSend = content.replace('data:image/jpeg;base64,', '');
  console.log(toSend);
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision (content, detectType) {
  content = content.replace('data:image/jpeg;base64,', '');
  // this defined the type of detection when the select dropdown was active
  // var type = $('#fileform [name=type]').val();
  var type = detectType;
  // Strip out the file prefix when you convert to json.
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: type,
        maxResults: 200
      }]
    }]
  };

  $('#results').text('Loading...');
  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(displayJSON);
}

/**
 * Displays the results.
 */
function displayJSON (data) {

  var contents = JSON.stringify(data, null, 4);

  // console.log(data.responses[0]);

  var key;
  for(key in data.responses[0]) {
    if (key == 'logoAnnotations') {
      console.log('logo');
      $('#instructions').text('Is this the name of your beverage ' + data.responses[0].logoAnnotations[0].description + '?');
    } else {
      console.log('face');
      $('#instructions').text('Is this how you feel about your beverage ' + data.responses[0].faceAnnotations[0].joyLikelihood + '?');
      checkImage(data);
    }
  }
  $('#results').text(contents);
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}

function checkImage (data) {
  if (data.responses[0].faceAnnotations[0].underExposedLikelihood == "VERY_LIKELY" || data.responses[0].faceAnnotations[0].underExposedLikelihood == "LIKELY" || data.responses[0].faceAnnotations[0].underExposedLikelihood == "POSSIBLE" || data.responses[0].faceAnnotations[0].underExposedLikelihood == "UNLIKELY") {
    $('#instructions').text('Please retake the picture there was not enough light');
  } else if (data.responses[0].faceAnnotations[0].blurredLikelihood == "LIKELY" || data.responses[0].faceAnnotations[0].blurredLikelihood == "POSSIBLE") {
    $('#instructions').text('Please retake the picture it was too blurry');
  }
}
