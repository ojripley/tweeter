/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // this data will be fetched from the server eventually

  const tweetArray = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = function(tweetObject) {
    // use jQuery to create new article element
    const $tweet = $('<article>').addClass('tweet');

    // determine age of tweet in days
    const tweetAge = dayDifference(tweetObject.created_at);

    // append elements as children to article
    $tweet.append(`<header>
      <span class="user-icon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
      <span class="tweetedBy">${tweetObject.user.name}</span>
      <span class="username">${tweetObject.user.handle}</span>
      </header>
      <div class="content">${tweetObject.content.text}</div>
      <footer>
      <span class="date">${tweetAge} days ago</span>
      <a class="flag-button" href="flag"><i class="fa fa-flag" aria-hidden="true"></i></a>
      <a class="like-button" href="like"><i class="fa fa-heart" aria-hidden="true"></i></a>
      <a class="retweet-button" href="http://www.twitter.com"><i class="fa fa-retweet" aria-hidden="true"></i></a>
      </footer>`);

    // return the entire tweet object
    return $tweet;
  };

  const renderTweets = function(tweetArray) {
    // append each tweet to tweets container
    for (let tweet of tweetArray) {
      $('#tweets').append(createTweetElement(tweet));
    }
  };

  const dayDifference = function(dateInMilliseconds) {
    // returns number of days passed since date
    return Math.floor(((Date.now() - dateInMilliseconds) / 86400000));
  };

  renderTweets(tweetArray);
});