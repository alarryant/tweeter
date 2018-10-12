$(document).ready(function () {

  function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
    const time = moment(created_at).fromNow(); // converts Unix time to legible date
    const $article = $('<article>').addClass("tweet");
    const $header = $('<header>');
    const $image = $('<img>').attr('src', avatars.small);
    const $headerOne = $('<h1>').text(name);
    const $headerFive = $('<h5>').text(handle);
    const $paragraph = $('<p>').text(content.text);
    const $footer = $('<footer>').addClass("dateStamp").text(`Posted ${time}.`);
    const $flagIcon = $('<div class="social" id="flag"><i class="fab fa-font-awesome-flag"></i></div>');
    const $shareIcon = $('<div class="social" id="share"><i class="fas fa-retweet"></i></div>');
    const $heartIcon = $('<div class="social" id="heart"><i class="fas fa-heart"></i></div>');

    // construct header components first so that everything nests correctly
    let $headerComponents = $header.append($image).append($headerOne).append($headerFive);
    let $footerComponents = $footer.append($flagIcon).append($shareIcon).append($heartIcon);
    // final assembly
    return $article.append($headerComponents).append($paragraph).append($footerComponents);
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
    let input = $("textarea[name=text]").val(); // text entered in text area

    if (input.length === 0) {
      $(".error").text("BORK! Is it a bork if no one can hear you?").slideDown("slow");
    }
    else if (input.length > 140) {
      $(".error").text("BORK! Too long, noise complaint incoming!").slideDown("slow");
    } else {
      $(".error").slideUp("slow");
      $.ajax('/tweets', {method: 'POST', data: data, success:
        loadTweets
      });
      $("textarea[name=text]").val(''); // clear text area after submission
      $(".counter").text('140'); // reset counter after submission
    }
  });

// compose button
  $("button").click(function(){
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });
});


