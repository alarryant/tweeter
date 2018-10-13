"use strict";

$.fn.uncle = function (query) {
  return this.parent().siblings(query);
};

$(document).ready(function() {
  $("#tweets-container").on('click', '.heart', function(event) {
    const $clickTarget = $(event.target);
    const $tweetContent = $clickTarget.uncle("p").text();
    const $socialCounter = $clickTarget.uncle(".socialCounter");
    const currentLikes = Number($socialCounter.text());
    // if user has already liked the post
    if ($clickTarget.parent(".heart").hasClass("clicked")) {
      let newLikes;
      $socialCounter.removeClass("clicked");
        if (currentLikes >= 1) {
          newLikes = currentLikes - 1;
        } else {
          newLikes = 0;
        }
      $clickTarget.parent(".heart").removeClass("clicked");
      $socialCounter.text(newLikes);
      $socialCounter.attr('data-likes', newLikes);

    // if user hasn't already liked the post
    } else {
      $socialCounter.addClass("clicked");
      $clickTarget.parent(".heart").addClass("clicked"); // this allows heart to remain visible if post is liked
      const newLikes = currentLikes + 1;
      $socialCounter.text(newLikes);
      $socialCounter.attr('data-likes', newLikes);
    }
  });
});
