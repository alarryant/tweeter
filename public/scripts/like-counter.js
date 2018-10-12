$.fn.uncle = function (query) {
  return this.parent().siblings(query);
};

$(document).ready(function() {
  $("#tweets-container").on('click',  '.heart' , function(event) {
    const $clickTarget = $(event.target);
    const $socialCounter = $clickTarget.uncle(".socialCounter");
    const currentLikes = Number($socialCounter.text());
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
    } else {
      $socialCounter.addClass("clicked");
      $clickTarget.parent(".heart").addClass("clicked");
      const newLikes = currentLikes + 1;
      $socialCounter.text(newLikes);
    }
  });
});
