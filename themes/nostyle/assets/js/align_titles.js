document.addEventListener('DOMContentLoaded', function () {
  function alignTitles() {
    const listItems = document.querySelectorAll('#post-list li');
    if (!listItems.length) {
      console.log('No list items found.');
      return;
    }

    let maxSpanLength = 0;

    // Find the maximum length of span text
    listItems.forEach(item => {
      const span = item.querySelector('span');
      if (span) {
        const spanTextLength = span.textContent.length;
        if (spanTextLength > maxSpanLength) {
          maxSpanLength = spanTextLength;
        }
      }
    });

    // Add dots for alignment
    listItems.forEach(item => {
      const span = item.querySelector('span');
      if (span) {
        const currentLength = span.textContent.length;
        const dotCount = maxSpanLength - currentLength + 3;
        span.innerHTML += '.'.repeat(dotCount) + ' ';
      }
    });
  }

  alignTitles();
});
