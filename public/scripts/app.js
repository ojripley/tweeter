/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const displayScrollToTop = function() {
  
};

const submitNewTweet = function() {
  event.preventDefault();

  $('#error-message').slideUp();

  if ($(event.target).children('textarea').val().length === 0) {
    $('#error-message').text('Tweet submissons cannot be empty!');
    $('#error-message').slideDown();
  } else if ($(event.target).children('textarea').val().length > 140) {
    $('#error-message').text('Tweet submissons must be 140 characters or less!');
    $('#error-message').slideDown();
  } else {
    const serializedForm = $(event.target).serialize();

    $.ajax('/tweets', { method: 'POST', data: serializedForm })
      .then(() => {
        loadTweets();
      });
  }
    
};

const ageString = function(dateInMilliseconds) {
  
  const difference = (Date.now() - dateInMilliseconds);

  if (difference >= 86400000) {
    return `${Math.floor(difference / 86400000)} days ago`;
  } else if (difference >= 3600000) {
    return `${Math.floor(difference / 3600000)} hours ago`;
  } else if (difference >= 60000) {
    return `${Math.floor(difference / 60000)} minutes ago`;
  } else {
    return `${Math.floor(difference / 1000)} seconds ago`;
  }
};

const createTweetElement = function(tweetObject) {
  // use jQuery to create new article element
  const $tweet = $('<article>').addClass('tweet');

  // determine age of tweet
  const tweetAge = ageString(tweetObject.created_at);

  // append elements as children to article
  $tweet.append(`<header>
      <span class="user-icon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
      <span class="tweetedBy">${practiceSafeText(tweetObject.user.name)}</span>
      <span class="username">${practiceSafeText(tweetObject.user.handle)}</span>
      </header>
      <div class="content">${practiceSafeText(tweetObject.content.text)}</div>
      <footer>
      <span class="date">${tweetAge}</span>
      <a class="flag-button" href="flag"><i class="fa fa-flag" aria-hidden="true"></i></a>
      <a class="like-button" href="like"><i class="fa fa-heart" aria-hidden="true"></i></a>
      <a class="retweet-button" href="http://www.twitter.com"><i class="fa fa-retweet" aria-hidden="true"></i></a>
      </footer>`);

  // return the entire tweet object
  return $tweet;
};

const practiceSafeText = function(string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};


const renderTweets = function(tweetArray) {
  $('#tweets').empty();
  // append each tweet to tweets container
  for (let i = tweetArray.length - 1; i >= 0; i--) {
    
    $('#tweets').append(createTweetElement(tweetArray[i]));
  }
};

const loadTweets = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    });
};

$(document).ready(() => {
  
  loadTweets();

  $('.new-tweet-form').on('submit', (event) => {
    submitNewTweet(event);
  });

  $('.new-tweet-button').on('click', () => {
    console.log('clicked');
    $('.new-tweet').slideToggle();
  });

  // $(window).resize(function(e) {
  //   console.log(e);
  // });

  $(window).scroll(function(event) {
    const scrollPosition = $(window).scrollTop();
    if (scrollPosition > 400) {
      displayScrollToTop();
    } else if (scrollPosition < 400) {
      hideScrollToTop();
    }
  });

  
});