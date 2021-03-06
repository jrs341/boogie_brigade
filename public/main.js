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

// var client = new BreweryDb({apiKey:"2b575873cd6e77e40e7d4676df8c32b5"});
var type;

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

var Beer_db = 'http://api.brewerydb.com/v2/?key=' + window.apiKeyBeer;

var hasOwnProperty = Object.prototype.hasOwnProperty;

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

// will not accept query from localhost
function getRequest(beer) {

  console.log('get request');
              var params = {
               key: '2b575873cd6e77e40e7d4676df8c32b5',
               q: beer,
               withBreweries: "N",
               type: "beer",
              }
              $.ajax({
               url: 'http://api.brewerydb.com/v2/search',
               data: params,
               dataType: 'jsonp',
               type: 'GET'});
              $.getJSON('http://api.brewerydb.com/v2/search?key=2b575873cd6e77e40e7d4676df8c32b5&q=' + beer).done(function(data) {
                  showBeerResults(data);
                  //update number of search results spans
                  var numberOfResults = data.length;
                  console.log(numberOfResults);
                  // create objects to fix result tenses
                  var resultOptions = {
                      thereIs: 'There is ',
                      result: 'result for: ',
                      thereAre: 'There are ',
                      results: 'results for: '
                  };
                  // update search result display
                  $("#result-number").text(numberOfResults);
                  if (numberOfResults > 1) {               
                      console.log(numberOfResults);
                      $("#result-counter #there").text(resultOptions.thereAre);
                      $("#result-counter #result").text(resultOptions.results);
                  } 
                  else {
                      $("#result-counter #there").text(resultOptions.thereIs);
                      $("#result-counter #result").text(resultOptions.result);
                  }
                  $("#search-result").text(userInput);
                  $("#result-counter-container").fadeIn(300);
                  //console.log(data);
              })         
}

// function showBeerResults(results) {
//     console.log(results);
//     // data is defined by api. results turns into what user's input. ".data" allows access into object
//     // var peeledResults = results.data;
//     // console.log(results.data);
//     // iterate through results and append to page
//     // index keeps track of position
//     // item can be named anything. item is what allows us to access the info inside the object
//     $.each(results, function(index, item) {
//         var name = item.name;
//         var abv = item.abv;
//         var category = "";
//             if (!item.style){
//                 category = "Not Available";
//             } else {
//                 category = item.style.category.name;
//             }
//         var created = item.createDate;
//         var description = item.style.description;
//         var template = '<dl class="results">';
//             if (!abv) {
//                 abv = "Not Available";
//             }
//             if (!item.style){
//                 category = "Not Available";
//             }
//             if (!category) {
//                 category = "Not Available";
//             }
//             if (!created) {
//                 category = "Not Available";
//             }
//             if (!description) {
//                 description = "Not Available";
//             }
//         //append items to page using a template
//         template += '<dt>Beer Name:</dt>' +
//                 '<dd class="name">'+ name +'</dd>' +
//             '<dt>Abv:<dt>' +
//                 '<dd class="abv">'+ abv +'</dd>' +
//             '<dt>Category:</dt>' +
//                 '<dd class="category">'+ category +'</dd>' +
//             '<dt>Date Created:</dt>' +
//                 '<dd class="created">' + created +'</dd>' +
//             '<dt>Description:</dt>' +
//                 '<dd class="description">' + description +'</dd>' 
//                 + displayBreweries(item.breweries) +
//             '</dl>';
//             //remove hidden class, append template
//             $(".results-template").removeClass("hidden").fadeIn(300);
//             $(".results-template .col-lg-12").append(template);
//     });
// }

// var displayBreweries = function(breweries) {
//     var breweriesTemplate = "";
//     $.each(breweries, function(index, breweries) {
//         var breweryWebsite = breweries.website;
//         var breweryName = breweries.name;
//         if (!breweryWebsite) {
//             breweryWebsite = "Not Available"; 
//         }
//         if (!breweryName) {
//             breweryName = "Not Available";    
//         }
//         breweriesTemplate += '<dt>Brewery:</dt>' +
//                 '<dd class="brewery-name"><a href="' + breweryWebsite + '"target="_blank">' + breweryName +'</dd>' 
//     });
//     return breweriesTemplate;
// }

/**
 * Displays the results.
 */
function displayJSON (data) {

  var contents = JSON.stringify(data, null, 4);

  console.log(data.responses[0]);

  isEmpty(data.responses[0]);

  var key;

  for(key in data.responses[0]) {

    if (key == 'logoAnnotations') {
      console.log('logo');
      $('#approveButtonLink').attr('href', 'javascript:void(sendToApi())');
      $('#retakeButtonLink').attr('href', 'javascript:void(retakeLogo())');
      $('#instructions').text('Is this the name of your beverage ' + data.responses[0].logoAnnotations[0].description + '?');
      window.beer = data.responses[0].logoAnnotations[0].description;
      getRequest(beer);
      // client.beers({name: data.responses[0].logoAnnotations[0].description}, function(err, data) {
      // console.log(data);
      // });
    } else {
      console.log('face');
        if (data.responses[0].faceAnnotations[0].joyLikelihood == "VERY_UNLIKELY" || data.responses[0].faceAnnotations[0].joyLikelihood == "UNLIKELY" ) {
          $('#instructions').text('Looks like you don\'t like this drink at all, better try another one!   ');
          $('#approveSnapShot').show();
          $('#retakeSnapShot').show();
        }else if (data.responses[0].faceAnnotations[0].joyLikelihood == "POSSIBLE"){
          $('#instructions').text('Looks like your indifferent about this one, maybe the second one will taste better');
          $('#refresh').show();
        }else{
          $('#instructions').text('Looks like your really enjoying that drink, shall we add it to your favorites?');
          $('#approveButtonLink').attr('href', 'javascript:void(addToFav())');
          $('#retakeButtonLink').attr('href', 'javascript:void(noToFav())');
          $('#approveSnapShot').show();
          $('#retakeSnapShot').show();
        } 

      checkImage(data);
    }
  }
  $('#results').text(contents);
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}

// checks returned data to see if the image was underexposed or blurry
function checkImage (data) {
  if (data.responses[0].faceAnnotations[0].underExposedLikelihood == "VERY_LIKELY" || data.responses[0].faceAnnotations[0].underExposedLikelihood == "LIKELY" || data.responses[0].faceAnnotations[0].underExposedLikelihood == "POSSIBLE" || data.responses[0].faceAnnotations[0].underExposedLikelihood == "UNLIKELY") {
    $('#instructions').text('Please retake the picture there was not enough light');
  } else if (data.responses[0].faceAnnotations[0].blurredLikelihood == "LIKELY" || data.responses[0].faceAnnotations[0].blurredLikelihood == "POSSIBLE") {
    $('#instructions').text('Please retake the picture it was too blurry');
  }
}

// checks to make sure the object returned is not empty
// reference http://stackoverflow.com/questions/4994201/is-object-empty
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    // console.log('it is empty');
    picNum = 1;
    $('#instructions').text('oops we didn\'t get that please retake the picture');
    $('#snapShot').show();
    $('#approveSnapShot').hide();
    $('#retakeSnapShot').hide();
    return true;
}
