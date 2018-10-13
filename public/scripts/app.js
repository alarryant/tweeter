$(document).ready(function () {

  function createTweetElement({ user: { avatars, name, handle }, content, created_at }) {
    const time = moment(created_at).fromNow(); // converts Unix time to legible date difference
    const $article = $('<article>').addClass("tweet");
    const $header = $('<header>');
    const $image = $('<img>').attr('src', avatars.small);
    const $headerOne = $('<h1>').text(name);
    const $headerFive = $('<h5>').text(handle);
    const $paragraph = $('<p>').text(content.text);
    const $footer = $('<footer>').addClass("dateStamp").text(`Posted ${time}.`);
    const $flagIcon = $('<div class="social flag"><i class="fab fa-font-awesome-flag"></i></div>');
    const $shareIcon = $('<div class="social share"><i class="fas fa-retweet"></i></div>');
    const $heartIcon = $('<div class="heart"><i class="fas fa-heart"></i></div>');
    const $counter = $('<span>').addClass("socialCounter").attr('data-likes', 0); //data-likes to be used to save number of likes in database later

    // construct header components first so that everything nests correctly
    let $headerComponents = $header.append($image).append($headerOne).append($headerFive);
    let $footerComponents = $footer.append($flagIcon).append($shareIcon).append($heartIcon).append($counter);
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
    $(".error").slideUp("slow");
  });
});

// please disregard below, working on code for stretch activity
  // $("#tweets-container").on('click', '.heart', function(event) {
  //   const $clickTarget = $(event.target);
  //   const $tweetContent = $clickTarget.uncle("p").text();
  //   const $socialCounter = $clickTarget.uncle(".socialCounter");
  //   const likesCount = $socialCounter[likes];
  //   return db.collections("tweets").update({ 'content': $tweetContent }, { $set {'likes': likesCount } } );
  // });


  // var postID = 0;
  // db.collection("tweets").count();
  // postID can be db.collection("tweets")??
    // const dbPosition = Number(db.collection("tweets").collect()) + 1;
     // .attr('data-dbposition', dbPosition);





