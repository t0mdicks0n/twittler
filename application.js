/*
$(document).ready(function(){
  var $body = $('body');
  $body.find('.content').html('');

  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="content"><div class="user"></div><div class="tweet"></div><div class="timestamp"></div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }
});
*/

$(document).ready(function() {

  // Global variables
  var INDEX_IN_TWEETS = 0;
  var $body = $('body').find('.stream');
  $body.find('.stream').html('');

  // Wait a couple of milliseconds on initial load for data_generator to load a couple of tweets.
  setTimeout(fetchTweets, 500, 6);

  // Runs constantly after a fixed interval and updates how many unread tweets the user has.
  setInterval(streamUpload, 5000);

  // Events
  $('body').find('#more-tweets').on('click', function() {
    if ($('body').find('#more-tweets').text() !== 'Waiting for tweets..') {
      $('body').find('#more-tweets').text('Waiting for tweets..');
      fetchTweets(streams.home.length - INDEX_IN_TWEETS - 1);
    }
  }).css("cursor", "pointer");

  // Functions
  function fetchTweets(nrOfTweets) {
    for (var i = 0; i < nrOfTweets; i++) {
      INDEX_IN_TWEETS ++;
      var tweet = streams.home[INDEX_IN_TWEETS];
      var $tweet = $('<div class="content"><div class="timestamp"></div><div class="user"></div><div class="tweet"></div></div>');

      $tweet.find('.user').text('@' + tweet.user);
      $tweet.find('.timestamp').text(tweet.created_at.toLocaleString());
      $tweet.find('.tweet').text(tweet.message);
      
      $tweet.prependTo($body);
    }
  }

  function streamUpload() {
    var newTweets = streams.home.length - INDEX_IN_TWEETS;
    if (newTweets > 0) {
      $('body').find('#more-tweets').html("You have <strong>" + newTweets + "</strong> new tweets to show. Click to show them.");
    }
  }
});




