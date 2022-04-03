/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {

  const escape = function(str) { // prevent cross-site scripting by escape
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const { user, content, created_at } = tweet;
  const $tweet = $(
    `<article>
    <header class="user">
      <div class="icon">
        <img class="userFace" src=${user.avatars}></img><span>${user.name}</span>
      </div>
      <div class="email"><span>${user.handle}</span>
      </div>
    </header>
    <p>${escape(content.text)}</p>
    <footer>
      <div class="lastVisit"><span>${timeago.format(created_at)}</span>                
      </div>
      <div>
        <i class="fa-solid fa-flag"></i>&nbsp;&nbsp;
        <i class="fa-solid fa-retweet"></i>&nbsp;&nbsp;
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  return $tweet;
};

const renderTweets = function(object) {
  for (let tweet in object) {
    $(".tweet-component").prepend(createTweetElement(object[tweet]));
  }
  return;
};

$(document).ready(function() {
  $('.validation1').hide(); // keep validation messages hidden after webpage refreshed
  $('.validation2').hide();

  $('#tweets').submit(function(event) {
    event.preventDefault(); // prevent the synchronous event
    $('.validation1').hide(); // hide slide down validation messages after submission of the tweet
    $('.validation2').hide();

    if (!document.getElementById("tweet-text").value) { // if tweet button pressed without a message, validation error message triggered
      return $('.validation1').slideDown();
    }

    if (document.getElementById("tweet-text").value.length > 140) { // if the user types more than 140 characthers, a validation error message triggered
      return $('.validation2').slideDown();
    }

    const data = $(this).serialize();
    $.post('/tweets', data).then(() => {
      loadTweets();
      this.reset(); // clear the tweet text area after submission of a tweet
      $(".counter").text(140); // reset the character count to 140 after submission of a tweet
    });
  });

  const loadTweets = function() {
    $.get("http://localhost:8080/tweets").then(data => {
      renderTweets(data);
    });
  };
  loadTweets();
});