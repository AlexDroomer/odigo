(function () {
    var header = document.querySelector('.header');
  
    window.onscroll = function () {
      if (window.pageYOffset > 125) {
        header.classList.add('header_active');
      } else {
        header.classList.remove('header_active');
      }
    };
  })(); //Burger handler
  
  
  (function () {
    var burgerItem = document.querySelector('.burger');
    var menu = document.querySelector('.header__nav');
    var menuCloseItem = document.querySelector('.header__nav-close');
    var menuLinks = document.querySelectorAll('.header__link');
    burgerItem.addEventListener('click', function () {
      menu.classList.add('header__nav_active');
    });
    menuCloseItem.addEventListener('click', function () {
      menu.classList.remove('header__nav_active');
    });
  
    if (window.innerWidth <= 767) {
      for (var i = 0; i < menuLinks.length; i += 1) {
        menuLinks[i].addEventListener('click', function () {
          menu.classList.remove('header__nav_active');
        });
      }
    }
  })();
  
  (function () {
    var smoothScroll = function smoothScroll(targetEl, duration) {
      var headerElHeight = document.querySelector('.header').clientHeight;
      var target = document.querySelector(targetEl);
      var targetPosition = target.getBoundingClientRect().top - headerElHeight;
      var startPosition = window.pageYOffset;
      var startTime = null;
  
      var ease = function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };
  
      var animation = function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
  
      requestAnimationFrame(animation);
    };
  
    var scrollTo = function scrollTo() {
      var links = document.querySelectorAll('.js-scroll');
      links.forEach(function (each) {
        each.addEventListener('click', function () {
          var currentTarget = this.getAttribute('href');
          smoothScroll(currentTarget, 1000);
        });
      });
    };
  
    scrollTo();
  })();

 