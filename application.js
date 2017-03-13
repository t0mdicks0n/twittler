$(document).ready(function() {

  // Global variables
  var INDEX_IN_TWEETS = 0;
  var $body = $('body').find('.stream');
  $body.find('.stream').html('');
  var USER_VIEW = false;
  var CURRENT_USER = "not set";

  // Wait a couple of milliseconds on initial load for data_generator to load a couple of tweets.
  setTimeout(fetchTweets, 500, 6);

  // Runs constantly after a fixed interval and updates how many unread tweets the user has.
  setInterval(streamUpload, 5000);

  // Events
  $('body').find('#more-tweets').on('click', function() {
    if (USER_VIEW) {
        $('body').find('#more-tweets').text('Waiting for tweets..');
        fetchTweets(streams.home.length - INDEX_IN_TWEETS - 1);
        USER_VIEW = false;
        clearFilter();
    } else {
      if ($('body').find('#more-tweets').text() !== 'Waiting for tweets..') {
        $('body').find('#more-tweets').text('Waiting for tweets..');
        fetchTweets(streams.home.length - INDEX_IN_TWEETS - 1);
      }
    }
  }).css("cursor", "pointer");

  $('.stream').on('click', '.content .user', function() {
    USER_VIEW = true;
    CURRENT_USER = $(this).parent().data('user');
    $('body').find('#more-tweets').html('<div id="more-tweets back">&larr; Back</div>');
    // Do something here to filter out
    userFilter(CURRENT_USER);
  });

  $('.stream').on('mouseover', '.content .user', function() {
    $(this).css("cursor", "pointer");
  });

  // Functions
  function fetchTweets(nrOfTweets) {
    for (var i = 0; i < nrOfTweets; i++) {
      INDEX_IN_TWEETS ++;
      var tweet = streams.home[INDEX_IN_TWEETS];
      var $tweet = $('<div class="content" data-user="' + tweet.user + '"><div class="user" id="user"></div><div class="timestamp"></div><div class="tweet"></div></div>');

      $tweet.find('.user').text('@' + tweet.user);
      $tweet.find('.timestamp').text(tweet.created_at.toLocaleString());
      $tweet.find('.tweet').text(tweet.message);

      $tweet.prependTo($body);
    }
  }

  function streamUpload() {
    if (USER_VIEW === false) {
      var newTweets = streams.home.length - INDEX_IN_TWEETS;
      if (newTweets > 0) {
        $('body').find('#more-tweets').html("You have <strong>" + newTweets + "</strong> new tweets to show. Click to show them.");
        $('title').html('(' + newTweets + ') Twittler');
      }
    }
  }

  // A function that fetch and displays tweets for a specific user
  function userFilter(user) {
     var numOfTweets = $('body').find('.content').length;

     for (var i = 0; i < numOfTweets; i++) {
      if ($('.content:eq(' + i + ')').data('user') === user) {
        $('.content:eq(' + i + ')').css('display', 'block');
      } else {
        $('.content:eq(' + i + ')').css('display', 'none').slideUp();
      }
     }
  }

  function clearFilter() {
    var numOfTweets = $('body').find('.content').length;
    for (var i = 0; i < numOfTweets; i++) {
      $('.content:eq(' + i + ')').css('display', 'block');
    }
  }
});




