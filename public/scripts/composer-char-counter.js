$(document).ready(function() {
  // --- our code goes here ---

// function calculates remaining characters using value.length
  $("textarea").keyup(function() {
    const charLimit = 140;
    const remainingCharCount = charLimit - this.value.length;
    const counterInput = $(this).siblings()[1];

// negativeError class corresponds to the counter turning red when negative
    if (remainingCharCount >= 0) {
      $(counterInput).text(remainingCharCount).removeClass('negativeError');
    } else {
      $(counterInput).text(remainingCharCount).addClass('negativeError');
    }
  });
});
