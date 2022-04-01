/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  // console.log('user[0].avatars', user[0].avatars);
  console.log('user.name', user.name);
  const $tweet = $(
    `<article>
    <header class="user">
      <div class="icon">
        <img class="userFace" src=${user[0].avatars}></img><span>${user.name}</span>
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
  
  $('#tweets').submit(function(event) {
    event.preventDefault();
    
    if (!document.getElementById("tweet-text").value) {
      console.log('document.getElementById("tweet-text").value', document.getElementById("tweet-text").value);
      alert("Please enter a message");
      return;
    }
    if (document.getElementById("tweet-text").value.length > 140) {
      alert("Please enter a message of less than 140 characters");
      return;
    }

    $.post('/tweets', $(this).serialize()).then( data => {
      console.log('data', data);
      createTweetElement(data);
      
    })
  
    
  });

  const loadTweets = function() {
    $.get("http://localhost:8080/tweets").then( data => {
      // console.log('data', data);
      renderTweets(data);
    })
  }
  loadTweets();

})





