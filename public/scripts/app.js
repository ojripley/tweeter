/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// things to be run when the DOM has been loaded
$(document).ready(() => {

  // prep page on every load
  clearForm();
  loadTweets();

  // new tweet submition handling
  $('.new-tweet-form').on('submit', (event) => {
    submitNewTweet(event);
  });

  // new tweet button click handling
  $('.new-tweet-button').on('click', () => {
    showForm();
  });

  // submit tweet hover animation
  $('input').hover((event) => {
    $(event.target).css({ 'box-shadow': '3px 3px #4056a1', 'background': 'white', 'color': 'coral', 'outline': 'none'});
  }, (event) => {
    $(event.target).css({ 'box-shadow': 'none', 'background': '#4056a1', 'color': 'white', 'outline': 'none'});
  });

  // scroll position handling
  $(window).scroll(function() {
    let newTweet = document.querySelector('.new-tweet');
    const scrollPosition = $(window).scrollTop();
    handleScrollPosition(scrollPosition, newTweet);
  });

  // scroll to top button handling
  $('#scroll-to-top').on('click', () => {
    const scrollButton = $('#scroll-to-top');
    scrollToTop(scrollButton);
  });
});


const submitNewTweet = function() {
  // handles new tweet submission
  // displays errors for empty/too long tweets
  // otherwise, serializes the form and posts to the database via ajax

  event.preventDefault();

  $('#error-message').slideUp();

  // handle non valid tweets
  if (isValidTweet()) {
    
    // replace the new tweet button so user can write more than one tweet... lol
    $('.new-tweet-button').slideDown();

    const serializedForm = $(event.target).serialize();
    clearForm();
    const textarea = window.document.querySelector("textarea");
    textarea.style.height = "2.1em";

    $('.new-tweet').slideUp();

    $.ajax('/tweets', { method: 'POST', data: serializedForm })
      .then(() => {
        loadTweets();
      })
      .fail(() => {
        console.log(`Error loading tweets`);
      });
  }
};


const clearForm = function() {
  // removes any existing text from the textarea and resets the counter

  $('.new-tweet-form')[0].reset();
  $('.counter').text(140);
};


const createAgeString = function(dateInMilliseconds) {
  // assembles a string describing how many <units of time> ago of the tweet was created
  
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
  // assembels an html string out of a tweet object
  // returns the string

  // determine age of tweet
  const tweetAge = createAgeString(tweetObject.created_at);

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
    <a class="retweet-button" href="http://www.staggeringbeauty.com/"><i class="fa fa-retweet" aria-hidden="true"></i></a>
    </footer>
    </article>`;

  // return the entire tweet object
  return tweetHTMLString;
};


const practiceSafeText = function(string) {
  // escapes dangerous characters to prevent html injection

  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};


const renderTweets = function(tweetArray) {
  // clears tweets from the page, then assembles the array of tweets into a single string of html
  // html will automatically unpack itself into the tweets when appended to the tweets container

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
  // makes an ajax get request to the server for tweets
  // calls render tweets to display them

  $.ajax('/tweets', {method: 'GET'})
    .then((tweets) => {
      renderTweets(tweets);
    })
    .fail(() => {
      console.log(`Error loading tweets`);
    });
};


const showForm = function() {
  // shows the compose tweet form and shifts cursor focus to the textarea

  $('.new-tweet').slideDown(() => {
    $('#textarea').focus();
  });
  $('.new-tweet-button').slideUp();
};


const isValidTweet = function() {
  // returns true if tweet is valid
  // displays an error to the user if otherwise

  if ($(event.target).children('textarea').val().length === 0) {
    $('#error-message').text('Tweet submissons cannot be empty!');
    $('#error-message').slideDown();
    return false;
  } else if ($(event.target).children('textarea').val().length > 140) {
    $('#error-message').text('Tweet submissons must be 140 characters or less!');
    $('#error-message').slideDown();
    return false;
  }

  return true;
};

const scrollToTop = function(scrollButton) {
  // handles animations for scrolling to the top

  scrollButton.animate({ bottom: 30 }, 275, () => {
    scrollButton.css({ display: 'none' });
    scrollButton.css({ position: 'fixed', bottom: 0, right: 0 });
  });
  $(window).scrollTop(0);
  showForm();
};


const handleScrollPosition = function(scrollPosition, newTweet) {
  // for displaying scrollToTop button
  if (scrollPosition > 100) {
    $('.new-tweet-button').slideUp();
    $('#scroll-to-top').slideDown();
  } else if (scrollPosition < 100) {

    // evaluate display property of the new tweet form
    if (window.getComputedStyle(newTweet).display === 'none') {
      // only slide down the new tweet button if the form is not already displayed
      $('.new-tweet-button').slideDown();
    }
    $('#scroll-to-top').slideUp();
  }

  // for changing logo colour
  if (scrollPosition > 350) {
    if ($(window).width() < 768) {
      $('.new-tweet').slideUp();
      $('#tweeter-logo').css({ color: 'coral' });
    }
  } else if (scrollPosition < 350) {
    $('#tweeter-logo').css({ color: 'white' });
  }
  if (scrollPosition > 100) {
    if ($(window).width() > 768) {
      $('.new-tweet').slideUp();
    }
  }
};