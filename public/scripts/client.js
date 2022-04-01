/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweet) {
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
    <p>${content.text}</p>
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
}

const renderTweets = function(object) {
  for (let tweet in object) {
    $(".tweet-component").prepend(createTweetElement(object[tweet]));
  }
  return;
}
$(document).ready(function() {
  renderTweets(data);

  $('#tweets').submit(function(event) {
    event.preventDefault();
    console.log('data', data);
    console.log('this.serialize()',$(this).serialize());
    $.post('/tweets', $(this).serialize());
  });
})





