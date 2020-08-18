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


const $ = {}
window.$ = $
const modal = $.modal({
  title:'Sign in',
  form: `
  <form action="" class="search-form">
      <fieldset class="search-form__wrap">
          <p class="search-form__info">
              <input type="text" name="user-like-to-do" class="search-form__field" placeholder="Login">
              <input type="text" name="user-like-to-go" class="search-form__field" placeholder="Password">
              <button type="submit" class="search-form__submit">search</button>
          </p>
      </fieldset>
  </form>
  `
})

  function _createModal(options){
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin',`
    <div class="modal-overlay" data-close="true">
    <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-header">
            <span class="modal-title">${options.title || 'Sign In'}</span>
            ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
            ${options.content || ''}
        </div>
        <div class="modal-footer">
            <button>Submit</button>
        </div>
    </div>
</div>
    `)
    document.body.appendChild(modal)
    return modal
  }

  $.modal = function(options) {
    const ANIMATION_SPEED = 200
     const $modal = _createModal(options)
    let closing = false;
    let destroyed = false;
 
    const modal = {
     open(){
         if(destroyed) {
             return console('Modal is destroyed')
         }
         !closing && $modal.classList.add('open')
     },
     close() {
         $modal.classList.remove('open')
         $modal.classList.add('hide')
         setTimeout(() => {
             $modal.classList.remove('hide')
             closing = false;
         },ANIMATION_SPEED)
     }
    }
 
    const listener = event => {
     if(event.target.dataset.close) {
         modal.close()
     }
    }
 
    $modal.addEventListener('click', event => {
        if(event.target.dataset.close){
            modal.close()
        }
    })
 
    $modal.addEventListener('click', listener)
 
     return Object.assign(modal, {
         destroy(){
             $modal.parentNode.removeChild($modal)
             $modal.removeEventListener('click', listener)
             destroyed = true
         },
         setContent(html){
             $modal.querySelector('[data-content]').innerHTML = html
         }
     })
 }
 