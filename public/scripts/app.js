/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
    clearForm();







    $.ajax('/tweets', { method: 'POST', data: serializedForm })
      .then(() => {
        loadTweets();
      });
  }
    
};

const clearForm = function() {
  $('.new-tweet-form')[0].reset();
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

  // determine age of tweet
  const tweetAge = ageString(tweetObject.created_at);

  // create the html that will define a new tweet
  const tweetHTMLString = `
    <article class="tweet">
    <header>
    <span class="user-icon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
    <span class="tweetedBy">${practiceSafeText(tweetObject.user.name)}</span>
    <span class="username">${practiceSafeText(tweetObject.user.handle)}</span>
    </header>
    <p class="content">${practiceSafeText(tweetObject.content.text)}</p>
    <footer>
    <span class="date">${tweetAge}</span>
    <a class="flag-button" href="flag"><i class="fa fa-flag" aria-hidden="true"></i></a>
    <a class="like-button" href="like"><i class="fa fa-heart" aria-hidden="true"></i></a>
    <a class="retweet-button" href="http://www.twitter.com"><i class="fa fa-retweet" aria-hidden="true"></i></a>
    </footer>
    </article>`;

  // return the entire tweet object
  return tweetHTMLString;
};

const practiceSafeText = function(string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};


const renderTweets = function(tweetArray) {

  const tweetsToBeLoadedArray = [];

  $('#tweets').empty();
  // append each tweet to tweets container
  for (let i = tweetArray.length - 1; i >= 0; i--) {
    
    // putting the html into an array allows it to be joined into one string before appending it to the tweet container
    // this means that we will only be manipulating the dom once to append an endless amount of tweets
    tweetsToBeLoadedArray.push(createTweetElement(tweetArray[i]));
    
  }
  // join array into a sinlge string before appending
  $('#tweets').append(tweetsToBeLoadedArray.join(''));
};

const loadTweets = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    });
};

$(document).ready(() => {
  
  clearForm();

  loadTweets();

  $('.new-tweet-form').on('submit', (event) => {
    submitNewTweet(event);
  });

  $('.new-tweet-button').on('click', () => {
    console.log('clicked');
    $('.new-tweet').slideToggle();
  });

  $(window).scroll(function() {
    const scrollPosition = $(window).scrollTop();

    // for displaying scrollToTop button
    if (scrollPosition > 100) {
      $('.new-tweet-button').slideUp();
      $('#scrollToTop').slideDown();
    } else if (scrollPosition < 100) {
      $('.new-tweet-button').slideDown();
      $('#scrollToTop').slideUp();
    }

    // for changing logo colour
    // if (scrollPosition > 250) {
    //   $('#tweeter-logo').css({color: 'coral'});
    // } else if (scrollPosition < 250) {
    //   $('#tweeter-logo').css({ color: 'white' });
    // }
  });

  $('#scrollToTop').on('click', () => {
    $('#scrollToTop').animate({bottom: 30}, 275, () => {
      $('#scrollToTop').animate({bottom: -30}, 200, () => {
        $('#scrollToTop').css({ display: 'none' });
        $('#scrollToTop').css({ position: 'fixed', bottom: 0, right: 0 });
      });
    });
    $(window).scrollTop(0);
    $('.new-tweet').slideDown();
  });
});