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
  /*
  var $body = $('body');
  $body.find('.content').html('');

  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="content"><div class="timestamp"></div><div class="user"></div><div class="tweet"></div></div>');
    
    $tweet.find('.user').text('@' + tweet.user);
    $tweet.find('.timestamp').text(tweet.created_at.toLocaleString());
    $tweet.find('.tweet').text(tweet.message);
    
    $tweet.appendTo($body);
    index -= 1;
  }
  */

  var INDEX_IN_TWEETS = 0;
  var $body = $('body');
  $body.find('.content').html('');

  fetchTweets(10);

  function fetchTweets(nrOfTweets) {
    for (var i = 0; i <= nrOfTweets; i++) {
      INDEX_IN_TWEETS ++;
      var tweet = streams.home[INDEX_IN_TWEETS + i];
      var $tweet = $('<div class="content"><div class="timestamp"></div><div class="user"></div><div class="tweet"></div></div>');

      $tweet.find('.user').text('@' + tweet.user);
      $tweet.find('.timestamp').text(tweet.created_at.toLocaleString());
      $tweet.find('.tweet').text(tweet.message);
      
      $tweet.appendTo($body);

    }
  }

  // Något är trasig med ovan. Hur fasiken ska jag kunna få ut de senaste Tweetsen genom att ha en knapp längst upp på sidan som säger
  // "Hämta senaste Tweets" och skjuter ner de tidigare tweetsen längre ner på samma sida.
  // Jag har ju nu appendTo, varför kan jag inte helt enkelt göra dess motsvarighet prependTo(), som push med arrays liksom. Men vad
  // händer då med indexet?


});




