$(document).ready(function () {

  function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
    const newDate = new Date(created_at); // converts Unix time to legible date
    const $article = $('<article>').addClass("tweet");
    const $header = $('<header>');
    const $image = $('<img>').attr('src', avatars.small);
    const $headerOne = $('<h1>').text(name);
    const $headerFive = $('<h5>').text(handle);
    const $paragraph = $('<p>').text(content.text);
    const $footer = $('<footer>').text(`Posted on ${newDate}.`);

    // construct header components first so that everything nests correctly
    let $headerComponents = $header.append($image).append($headerOne).append($headerFive);
    // final assembly
    return $article.append($headerComponents).append($paragraph).append($footer);
  }

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
        renderTweets(tweets.reverse()); // reverse so newest tweet appears at the top of the feed
      }
    });
  }

  loadTweets(); // load existing tweets first

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
      $(".error").slideUp("slow");
      $.ajax('/tweets', {method: 'POST', data: data, success:
        loadTweets
      });
      $("textarea[name=text]").val(''); // clear text area after submission
      $(".counter").text('140'); // reset counter after submission
    }
  });

  $("button").click(function(){
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });
});


