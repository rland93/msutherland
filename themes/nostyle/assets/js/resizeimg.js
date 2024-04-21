
function adjustImagePositionForAll() {
  document.querySelectorAll('article img').forEach(img => {
    img.addEventListener('load', function () {
      adjustSingleImage(this);
    });
    if (img.complete) {
      adjustSingleImage(img);
    }
  });
}

function adjustSingleImage(img) {
  var article = img.closest('article');
  var articleWidth = article.offsetWidth;
  var imgWidth = img.offsetWidth;

  console.log(`img=${imgWidth}, article=${articleWidth}`)

  img.style.transform = '';
  img.style.width = '';

  if (imgWidth > 1.3 * articleWidth) {

    img.style.transform = 'translateX(-20%)';
    img.style.width = '140%';
  } else if (imgWidth > articleWidth) {
    img.style.width = '100%';
  } else {

  }

  if (img.alt && (!img.nextElementSibling || img.nextElementSibling.tagName !== 'FIGCAPTION')) {
    var caption = document.createElement('figcaption');
    caption.innerText = img.alt;

    img.insertAdjacentElement('afterend', caption);
  }
}

adjustImagePositionForAll();

window.addEventListener('resize', adjustImagePositionForAll);