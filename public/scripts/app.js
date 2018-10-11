const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(document).ready(function () {
  function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
    const $article = $('<article>').addClass("tweet");
    const $header = $('<header>');
    const $image = $('<img>').attr('src', avatars.small);
    const $headerOne = $('<h1>').text(name);
    const $headerFive = $('<h5>').text(handle);
    const $paragraph = $('<p>').text(content.text);
    const $footer = $('<footer>').text(created_at);

    let $headerComponents = $header.append($image).append($headerOne).append($headerFive);
    return $article.append($headerComponents).append($paragraph).append($footer);
  }

  var $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    for (let i = 0; i < tweets.length; i++) {
      let $newTweet = createTweetElement(tweets[i]);
      $('#tweets-container').append($newTweet);
    }
  }

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET', success:
      function (tweets) {
        renderTweets(tweets.reverse());
      }
    });
  }

  loadTweets();

  $('form').on('submit', (event) => {
    event.preventDefault();

    let data = $(event.target).serialize();
    let input = $("textarea[name=text]").val();

    if (input.length === 0) {
      $(".error").text("ERROR! Please enter a message before tweeting.").slideDown("slow");
    }
    else if (input.length > 140) {
      $(".error").text("ERROR! Too many characters.").slideDown("slow");
    } else {
      $(".error").slideUp("slow")
      $.ajax('/tweets', {method: 'POST', data: data, success:
        loadTweets
      });
      $("textarea[name=text]").val('');
      $(".counter").text('140');
    }
  });

  $("button").click(function(){
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });
});


